import { Component, HostBinding, HostListener, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './services/theme.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  themingSubscription: Subscription;

  deferredPrompt: any; // PWA: Store the event object for later use


  constructor(
    private themingService: ThemeService,
    private overlayContainer: OverlayContainer,
    private ngZone: NgZone,
    private swUpdate: SwUpdate) {

    this.swUpdate.versionUpdates.subscribe((a) => {
      console.log('versionUpdates', a);
      if (a.type == "VERSION_READY") {
        if (confirm('A new version of the app is available. Update now?'))
          window.location.reload();
      }
    });
  }


  @HostBinding('class') public cssClass: string;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    // Prevent the default browser prompt
    event.preventDefault();
    this.deferredPrompt = event;
    this.ngZone.run(() => {
      // You can show a custom install button or prompt here
      // For example, you can display an "Add to Home Screen" button
      this.showInstallPrompt();
    });
  }

  showInstallPrompt() {
    // You can create your own custom installation prompt here
    // For example, display a button to trigger installation
    // const installButton = document.getElementById('install-button');
    // installButton.style.display = 'block';
    // installButton.addEventListener('click', () => {
    //   // Show the browser's installation prompt
    //   this.deferredPrompt.prompt();
    //   // Wait for the user to respond to the prompt
    //   this.deferredPrompt.userChoice.then((choiceResult: any) => {
    //     if (choiceResult.outcome === 'accepted') {
    //       console.log('User accepted the A2HS prompt');
    //     } else {
    //       console.log('User dismissed the A2HS prompt');
    //     }
    //     this.deferredPrompt = null; // Reset the event
    //     installButton.style.display = 'none'; // Hide the install button
    //   });
    // });
  }


  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      // this.applyDarkMode(this.cssClass != '');
      this.applyTheme(theme);
    });
  }

  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyDarkMode(apply: boolean = true) {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    if (apply)
      overlayContainerClasses.add(this.cssClass);
  }

  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyTheme(theme: string) {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      console.log(themeClassesToRemove)
      overlayContainerClasses.remove(...themeClassesToRemove);
      console.log(theme)
      overlayContainerClasses.add(theme);
    }
  }
  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}
