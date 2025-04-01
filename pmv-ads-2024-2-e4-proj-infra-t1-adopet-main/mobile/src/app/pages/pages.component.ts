import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  constructor() {}

  public logout() {
    this.authService.logout();
  }

  public ngOnInit(): void {
    !this.authService.userToken() && this.router.navigate(['login']);
  }
}
