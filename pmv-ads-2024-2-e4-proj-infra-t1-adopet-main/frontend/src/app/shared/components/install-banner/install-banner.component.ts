import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-install-banner',
  templateUrl: './install-banner.component.html',
  styleUrls: ['./install-banner.component.css'],
})
export class InstallBannerComponent {
  public deferredPrompt: any = null;
  public showNotification: boolean = false;

  private readonly notificationService: NotificationService =
    inject(NotificationService);

  constructor() {}

  public async installApp(): Promise<void> {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        this.notificationService.success(
          'Sucesso',
          'Aplicativo instalado com sucesso'
        );
      } else {
        this.notificationService.error(
          'Erro',
          'Houve um problema. Tente mais tarde'
        );
      }

      this.deferredPrompt = null;
      this.showNotification = false;
    }
  }

  public closeNotification(): void {
    this.showNotification = false;
  }

  public ngOnInit(): void {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      window.navigator.userAgent
    );

    if (isMobile) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();

        this.deferredPrompt = event;
        this.showNotification = true;
        console.log('is mobile');
      });
    }
  }
}
