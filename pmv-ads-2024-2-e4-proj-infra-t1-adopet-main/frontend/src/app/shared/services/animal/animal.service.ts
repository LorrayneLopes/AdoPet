import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'environment';
import { AnimalInterfaces } from './animal.interfaces';
import { buildQueryParams } from 'src/app/utils/buildQueryParams';
import { ParamsType } from 'src/app/pages/user-animals/user-animals.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly http: HttpClient = inject(HttpClient);

  public getAll(
    payload: ParamsType
  ): Observable<AnimalInterfaces.Receive.GetAll> {
    const params = buildQueryParams(payload);

    return this.http.get<AnimalInterfaces.Receive.GetAll>(
      `${environment.baseUrl}/animals`,
      { params }
    );
  }

  public getById(id: string): Observable<AnimalInterfaces.Receive.GetById> {
    return this.http.get<AnimalInterfaces.Receive.GetById>(
      `${environment.baseUrl}/animals/${id}`
    );
  }

  public create(
    payload: AnimalInterfaces.Send.Create
  ): Observable<AnimalInterfaces.Receive.Create> {
    return this.http.post<AnimalInterfaces.Receive.Create>(
      `${environment.baseUrl}/animals`,
      payload
    );
  }

  public update(
    payload: AnimalInterfaces.Send.Update
  ): Observable<AnimalInterfaces.Receive.Update> {
    return this.http.patch<AnimalInterfaces.Receive.Update>(
      `${environment.baseUrl}/animals/${payload.id}`,
      payload
    );
  }

  public getByUserEmail(
    userEmail: string
  ): Observable<AnimalInterfaces.Receive.GetAll> {
    const params = buildQueryParams({
      email: userEmail,
    });

    return this.http.get<AnimalInterfaces.Receive.GetAll>(
      `${environment.baseUrl}/animals`,
      { params }
    );
  }

  public filter(
    payload: AnimalInterfaces.Send.Filter = {}
  ): Observable<AnimalInterfaces.Receive.Filter> {
    const params = buildQueryParams(payload);

    return this.http.get<AnimalInterfaces.Receive.Filter>(
      `${environment.baseUrl}/animals`,
      { params }
    );
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/animals/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
