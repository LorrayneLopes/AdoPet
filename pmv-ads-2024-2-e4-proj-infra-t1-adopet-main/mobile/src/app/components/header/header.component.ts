import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly authService: AuthService = inject(AuthService);

  public get isLoggedIn(): boolean {
    return this.authService.userToken() !== null;
  }
}
