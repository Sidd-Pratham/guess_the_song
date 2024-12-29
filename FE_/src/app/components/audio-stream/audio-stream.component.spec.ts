import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioStreamComponent } from './audio-stream.component';

describe('AudioStreamComponent', () => {
  let component: AudioStreamComponent;
  let fixture: ComponentFixture<AudioStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
