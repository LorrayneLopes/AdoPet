import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { UserInterfaces } from './user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  public readonly user: WritableSignal<UserInterfaces.Receive.GetById | null> =
    signal(null);

  public getAll(): Observable<UserInterfaces.Receive.GetAll> {
    return this.http.get<UserInterfaces.Receive.GetAll>(
      `${environment.userBaseUrl}/api/Users`
    );
  }

  public getById(id: string): Observable<UserInterfaces.Receive.GetById> {
    return this.http.get<UserInterfaces.Receive.GetById>(
      `${environment.userBaseUrl}/api/Users/${id}`
    );
  }

  public create(
    payload: UserInterfaces.Send.Create
  ): Observable<UserInterfaces.Receive.Create> {
    return this.http.post<UserInterfaces.Receive.Create>(
      `${environment.userBaseUrl}/api/Users`,
      payload
    );
  }

  public update(
    payload: UserInterfaces.Send.Update
  ): Observable<UserInterfaces.Receive.Update> {
    return this.http.put<UserInterfaces.Receive.Update>(
      `${environment.userBaseUrl}/api/Users`,
      payload
    );
  }

  public fetchAndStore(
    userId: string
  ): Observable<UserInterfaces.Receive.GetById> {
    return this.http
      .get<UserInterfaces.Receive.GetById>(
        `${environment.userBaseUrl}/api/Users/${userId}`
      )
      .pipe(tap((user) => this.user.set(user)));
  }
}
