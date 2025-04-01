import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { UserInterfaces } from 'src/app/shared/services/user/user.interface';

import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  private readonly userService: UserService = inject(UserService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  public onSubmit(payload: UserInterfaces.Send.Create): void {
    this.userService
      .create(payload)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/login']);
        }
      });
  }

  public ngOnInit(): void {
    this.authService.userToken() && this.router.navigate(['/home']);
  }
}
