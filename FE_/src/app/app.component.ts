import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioStreamComponent } from './components/audio-stream/audio-stream.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,AudioStreamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FE';
  constructor(){}
}