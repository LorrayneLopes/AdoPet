import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly toastController: ToastController = inject(ToastController);

  constructor() {}

  async success(message: string, duration: number = 3000): Promise<void> {
    await this.showToast(message, 'success', duration);
  }

  async error(message: string, duration: number = 3000): Promise<void> {
    await this.showToast(message, 'danger', duration);
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' | 'tertiary',
    duration: number
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'top',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
}
