import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-stream.component.html',
  styleUrl: './audio-stream.component.scss'
})
export class AudioStreamComponent {
  private socket: Socket;
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  switch:boolean=false;
  private chunks2:Blob[]=[];
  // isPlaying:boolean=true;

  constructor() {
    this.socket = io('http://localhost:3225', {
      transports: ['websocket'],
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('new-user', () => {
      console.log("New user has joined the streaming");
    });

    this.socket.on('welcome', () => {
      console.log("Welcome User..!");
    });

    this.socket.on('audio-stream', async (audioData) => {
      try {
        // Convert ArrayBuffer to Blob if needed
        const audioBlob = audioData instanceof Blob ? 
          audioData : 
          new Blob([audioData], { type: 'audio/webm;codecs=opus' });

        console.log('Received audio chunk size:', audioBlob.size);
        if(!this.switch)
        {
          this.chunks.push(audioBlob);
        }
        else
        {
          this.chunks2.push(audioBlob);
        }
        

        // Play accumulated chunks
        // if (this.chunks.length >= 10) { // Reduced from 5 to 3 for faster playback
        //   const combinedBlob = new Blob(this.chunks, { 
        //     type: 'audio/webm;codecs=opus' 
        //   });
        //   if (this.isPlaying) {
        //      await this.playAudioBlob(combinedBlob);
        //      console.log("HELOOOOOO")
        //   }
        // }

      } catch (error) {
        console.error('Error processing audio data:', error);
      }
    });
  }

  async startBroadcast() {
    await this.captureAudio();
    this.socket.emit('start-stream');
  }

  stopBroadcast() {
      this.socket.emit('stop-stream'); 
  }
    audioUrl: string | null = null;


  private async captureAudio() {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      const audioTracks = mediaStream.getAudioTracks();
      if (audioTracks.length === 0) {
        throw new Error('No audio tracks captured');
      }

      const audioOnlyStream = new MediaStream(audioTracks);
      this.mediaRecorder = new MediaRecorder(audioOnlyStream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          // Convert to ArrayBuffer before sending
          const arrayBuffer = await event.data.arrayBuffer();
          this.socket.emit('audio-stream', arrayBuffer);
        }
      };

      this.mediaRecorder.onstart = () => {
        console.log('MediaRecorder started');
      };

      this.mediaRecorder.onerror = (err) => {
        console.error('MediaRecorder error:', err);
        this.stopBroadcast();
      };

      this.mediaRecorder.start(1000); // 1 second chunks
      return this.mediaRecorder;

    } catch (error) {
      console.error('Error capturing audio:', error);
      this.stopBroadcast();
      throw error;
    }
  }
  async enableAudio() {
    if (!this.switch) {
      const combinedBlob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
      this.chunks = [];
      this.switch = !this.switch;
      await this.playAudioBlob(combinedBlob);
    } else {
      const combinedBlob = new Blob(this.chunks2, { type: 'audio/webm;codecs=opus' });
      this.chunks2 = [];
      this.switch = !this.switch;
      await this.playAudioBlob(combinedBlob);
    }
  }
  
  async playAudioBlob(blob: Blob) {
    // Clean up the old Blob URL if it exists
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
  
    this.audioUrl = URL.createObjectURL(blob);
  
    console.log('Playing audio blob:', blob);
    console.log('Blob size:', blob.size);
    console.log('Blob type:', blob.type);
  
    const audio = new Audio(this.audioUrl);
  
   
  
    try {
      await audio.play();
      console.log('Successfully started playing audio chunk');
      audio.onended = async () => {
        console.log('Audio finished playing');
        await this.enableAudio();
      };
    } catch (err) {
      console.error('Error Playing:', err);
    }
  }
}