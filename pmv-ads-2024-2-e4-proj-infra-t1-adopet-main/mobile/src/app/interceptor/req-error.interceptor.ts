import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthService } from '../shared/services/auth/auth.service';
import { NotificationService } from '../shared/services/notification/notification.service';

@Injectable()
export class ReqErrorInterceptor implements HttpInterceptor {
  private readonly authService: AuthService = inject(AuthService);
  private readonly notifyService: NotificationService =
    inject(NotificationService);

  private async logoutIfUnauthorized(error: any): Promise<void> {
    this.authService.logout();
    await this.showErrorMessage(this.getErrorMessage(error));
  }

  private getErrorMessage(error: any): string {
    if (error.message) return error.message;

    return 'Erro desconhecido';
  }

  private async showErrorMessage(message: string): Promise<void> {
    await this.notifyService.error(message, 3000);
  }

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if ([401, 403].includes(error.status)) {
          this.logoutIfUnauthorized(error).catch((err) =>
            console.error('Erro ao lidar com logout:', err)
          );
        } else {
          this.showErrorMessage(this.getErrorMessage(error)).catch((err) =>
            console.error('Erro ao exibir mensagem:', err)
          );
        }

        return throwError(() => error);
      })
    );
  }
}
