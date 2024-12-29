// async enableAudio()
//   {
//     // console.log("heloooooooooo");
//     //   console.log(this.chunks)
   
//     if(!this.switch)
//     {
//     const combinedBlob = new Blob(this.chunks, { 
//       type: 'audio/webm;codecs=opus' 
//     });
//     this.chunks=[];
//     this.switch=!this.switch;
//     await this.playAudioBlob(combinedBlob);
//     }
//     else
//     {
//       const combinedBlob = new Blob(this.chunks2, { 
//         type: 'audio/webm;codecs=opus' 
//       });
//       this.chunks2=[];
//       this.switch=!this.switch;
//       await this.playAudioBlob(combinedBlob);
//     }
//     // console.log("Heloooo2",combinedBlob,this.chunks.length);     
//   }
//   audioUrl: string | null = null;

//   async playAudioBlob(blob: Blob) {
//     // this.isPlaying = false; 
//     // Log the blob details
//     console.log('Playing audio blob:', blob);
//     console.log('Blob size:', blob.size);
//     console.log('Blob type:', blob.type);
  
//     const audioUrl =  URL.createObjectURL(blob);
//     // console.log("URLLLLLLLLLLLLLL",audioUrl)
//     // if(this.audioUrl != null)
//     // {
//       console.log("heLOOOOOOOOOOOOOOOOOOO")
//       const anchor = document.createElement('a');
//       anchor.href = this.audioUrl!;
//       anchor.download = 'audio.webm';
//       anchor.click();
//     // }
//     const audio =  new Audio(audioUrl);
//     // console.log(this.audioUrl,audio)
//     // // audio.oncanplay=async()=>{
//       await audio.play()
//       .then(() => {
//         console.log('Successfully started playing audio chunk');
      
//         // await this.enableAudio();
//       })
//       .catch(err => {
//         console.log("Error Playing", err);
//       });
//     // }
//   //   const audioElement = document.createElement('audio');
//   //   audioElement.src = this.audioUrl;
//   //   audioElement.controls = true;
//   //   document.body.appendChild(audioElement);
//   //   audioElement.play()
//   //   .then(() => console.log('Playback started'))
//   //   .catch((err) => console.error('Error Playing:', err));

//     audio.addEventListener('ended', () => {
//       console.log(`Chunk  finished playing`);
//       // audioElement.remove(); // Clean up the old audio element
      
//       this.enableAudio()
//   });
//   }