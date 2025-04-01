import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { AuthInterfaces } from 'src/app/shared/services/auth/auth.interfaces';

import { getFieldErrorMessage } from 'src/app/utils/getFieldErrorMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  public readonly getErrorMessage = getFieldErrorMessage;
  public readonly formKeys: Record<
    keyof AuthInterfaces.Send.Login,
    keyof AuthInterfaces.Send.Login
  > = { email: 'email', password: 'password' };

  private readonly authService: AuthService = inject(AuthService);
  private readonly fb: FormBuilder = new FormBuilder();
  private readonly router: Router = inject(Router);

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('admin@admin.com', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control('@Teste123', [Validators.required]),
    });
  }

  private login(): void {
    const payload: AuthInterfaces.Send.Login = this.form.value;

    this.authService
      .login(payload)
      .pipe(take(1))
      .subscribe((_) => this.router.navigate(['pages', 'search']));
  }

  public onSubmit(): void {
    if (!this.form.valid) return;

    this.login();
  }

  public ngOnInit(): void {
    this.authService.userToken() && this.router.navigate(['pages', 'search']);
  }
}
