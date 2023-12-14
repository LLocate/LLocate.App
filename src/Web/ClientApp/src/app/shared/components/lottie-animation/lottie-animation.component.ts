import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as lottie from 'lottie-web';

@Component({
  selector: 'app-lottie-animation',
  standalone: true,
  imports: [],
  templateUrl: './lottie-animation.component.html',
  styleUrl: './lottie-animation.component.css'
})
export class LottieAnimationComponent implements AfterViewInit {
  @ViewChild('lottieContainer') lottieContainer: ElementRef;

  ngAfterViewInit(): void {
    this.initLottie();
  }

  private initLottie() {
    const animation = lottie.default.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg', // or 'canvas'
      loop: true,
      autoplay: true,
      path: 'assets/animations/cat-loading.json' // Path to your JSON animation file
    });
  }
}
