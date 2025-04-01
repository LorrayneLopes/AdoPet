import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import pt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { ReqErrorInterceptor } from './interceptor/req-error.interceptor';
import { ReqSuccessInterceptor } from './interceptor/req-success.interceptor';

registerLocaleData(pt);

@NgModule({
  imports: [
    PagesModule,
    SharedModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ReqErrorInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ReqSuccessInterceptor,
    //   multi: true,
    // },
    { provide: NZ_I18N, useValue: pt_BR },
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
})
export class AppModule {}
