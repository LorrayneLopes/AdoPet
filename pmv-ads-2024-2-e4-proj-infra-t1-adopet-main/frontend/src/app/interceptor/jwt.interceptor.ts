import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../shared/services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly authService: AuthService = inject(AuthService);

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.userToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.userToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
