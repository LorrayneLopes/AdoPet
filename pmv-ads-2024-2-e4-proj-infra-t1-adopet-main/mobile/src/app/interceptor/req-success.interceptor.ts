import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { NotificationService } from '../shared/services/notification/notification.service';

@Injectable()
export class ReqSuccessInterceptor implements HttpInterceptor {
  private readonly notifyService: NotificationService =
    inject(NotificationService);

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.notifyService
            .success('Sucesso!', 3000)
            .catch((error) =>
              console.error('Erro ao exibir notificação de sucesso:', error)
            );
        }
      })
    );
  }
}
