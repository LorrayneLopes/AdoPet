import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-install-banner></app-install-banner>
    <app-layout></app-layout>
    <app-loader></app-loader>
  `,
})
export class AppComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);

  public ngOnInit(): void {
    this.authService.autoLogin();
  }
}
