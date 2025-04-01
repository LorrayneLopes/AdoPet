import { inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifyService: NzNotificationService = inject(
    NzNotificationService
  );

  public success(title: string, content: string): void {
    this.notifyService.success(title, content);
  }

  public error(title: string, content: string): void {
    this.notifyService.error(title, content);
  }
}
