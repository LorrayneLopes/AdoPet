import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';

import { finalize, Observable } from 'rxjs';

import { LoaderService } from '../shared/services/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private activeRequests = 0;

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequests === 0) {
      this.loaderService.show();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests === 0) this.loaderService.hide();
      })
    );
  }
}
