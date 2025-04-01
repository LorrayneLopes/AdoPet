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

  private logoutIfUnauthorized(error: any): void {
    this.authService.logout();
    this.showErrorMessage(this.getErrorMessage(error));
  }

  private getErrorMessage(error: any): string {
    if (error.message) return error.message;

    return 'Erro desconhecido';
  }

  private showErrorMessage(message: string): void {
    this.notifyService.error('Error!', message);
  }

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        [401, 403].includes(error.status)
          ? this.logoutIfUnauthorized(error)
          : this.showErrorMessage(this.getErrorMessage(error));

        return throwError(() => error);
      })
    );
  }
}
