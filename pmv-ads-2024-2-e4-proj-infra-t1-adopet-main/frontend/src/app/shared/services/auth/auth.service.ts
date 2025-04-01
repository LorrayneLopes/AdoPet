import {
  inject,
  signal,
  effect,
  Injectable,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, switchMap, tap, throwError } from 'rxjs';

import { environment } from 'environment';

import { AuthInterfaces } from './auth.interfaces';
import { UserInterfaces } from '../user/user.interface';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router: Router = inject(Router);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly userService: UserService = inject(UserService);

  public readonly userToken: WritableSignal<string | null> = signal(null);

  private readonly tokenKey = 'token';
  private readonly userKey = 'user';

  constructor() {
    effect(() => {
      if (this.userService.user()) {
        this.saveUserInLocalStorage(
          this.userService.user() as UserInterfaces.Receive.GetById
        );
      }

      if (this.userToken() && this.userToken() !== null) {
        this.saveTokenInLocalStorage(this.userToken() as string);
      }
    });
  }

  private saveTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private removeTokenFromLocalStorage(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private saveUserInLocalStorage(user: UserInterfaces.Receive.GetById): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): UserInterfaces.Receive.GetById | null {
    const user = localStorage.getItem(this.userKey);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(this.userKey);
  }

  public autoLogin(): void {
    const token = this.getTokenFromLocalStorage();

    if (token) {
      this.userToken.set(token);

      const user = this.getUserFromLocalStorage();

      if (user) {
        this.userService.user.set(user);
      }
    }
  }

  public login(
    payload: AuthInterfaces.Send.Login
  ): Observable<UserInterfaces.Receive.GetById> {
    return this.http
      .post<AuthInterfaces.Receive.Login>(
        `${environment.baseUrl}/login`,
        payload
      )
      .pipe(
        switchMap((response) => {
          if (!response.accessToken) throwError(() => 'No access token');
          this.userToken.set(response.accessToken);

          return this.userService
            .fetchAndStore(response.user.id)
            .pipe(tap((user) => this.saveUserInLocalStorage(user)));
        })
      );
  }

  public logout(): void {
    this.userToken.set(null);
    this.userService.user.set(null);

    this.removeTokenFromLocalStorage();
    this.removeUserFromLocalStorage();

    this.router.navigate(['/login']);
  }
}
