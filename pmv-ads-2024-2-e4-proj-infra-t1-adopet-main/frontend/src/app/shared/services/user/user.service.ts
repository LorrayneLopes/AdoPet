import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { environment } from 'environment';

import { UserInterfaces } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  public readonly user: WritableSignal<UserInterfaces.Receive.GetById | null> =
    signal(null);

  public getAll(): Observable<UserInterfaces.Receive.GetAll> {
    return this.http.get<UserInterfaces.Receive.GetAll>(
      `${environment.baseUrl}/users`
    );
  }

  public getById(id: string): Observable<UserInterfaces.Receive.GetById> {
    return this.http.get<UserInterfaces.Receive.GetById>(
      `${environment.baseUrl}/users/${id}`
    );
  }

  public create(
    payload: UserInterfaces.Send.Create
  ): Observable<UserInterfaces.Receive.Create> {
    return this.http.post<UserInterfaces.Receive.Create>(
      `${environment.baseUrl}/users`,
      payload
    );
  }

  public update(
    payload: UserInterfaces.Send.Update
  ): Observable<UserInterfaces.Receive.Update> {
    return this.http.patch<UserInterfaces.Receive.Update>(
      `${environment.baseUrl}/users/${payload.id}`,
      payload
    );
  }

  public fetchAndStore(
    userId: string
  ): Observable<UserInterfaces.Receive.GetById> {
    return this.http
      .get<UserInterfaces.Receive.GetById>(
        `${environment.baseUrl}/users/${userId}`
      )
      .pipe(tap((user) => this.user.set(user)));
  }
}
