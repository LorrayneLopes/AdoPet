import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AnimalInterfaces } from './animal.interfaces';
import { environment } from 'src/environments/environment';
import { buildQueryParams } from 'src/app/utils/buildQueryParams';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly http: HttpClient = inject(HttpClient);

  public getAll(): Observable<AnimalInterfaces.Receive.GetAll> {
    return this.http.get<AnimalInterfaces.Receive.GetAll>(
      `${environment.petBaseUrl}/api/Pets`
    );
  }

  public getById(id: string): Observable<AnimalInterfaces.Receive.GetById> {
    return this.http.get<AnimalInterfaces.Receive.GetById>(
      `${environment.petBaseUrl}/api/Pets/${id}`
    );
  }

  public create(
    payload: AnimalInterfaces.Send.Create
  ): Observable<AnimalInterfaces.Receive.Create> {
    return this.http.post<AnimalInterfaces.Receive.Create>(
      `${environment.petBaseUrl}/api/Pets`,
      payload
    );
  }

  public update(
    payload: AnimalInterfaces.Send.Update
  ): Observable<AnimalInterfaces.Receive.Update> {
    return this.http.put<AnimalInterfaces.Receive.Update>(
      `${environment.petBaseUrl}/api/Pets`,
      payload
    );
  }

  public getByUserEmail(
    userEmail: string
  ): Observable<AnimalInterfaces.Receive.GetAll> {
    return this.http.get<AnimalInterfaces.Receive.GetAll>(
      `${environment.petBaseUrl}/api/Pets/find/${userEmail}`
    );
  }

  public filter(
    payload: AnimalInterfaces.Send.Filter = {}
  ): Observable<AnimalInterfaces.Receive.Filter> {
    const params = buildQueryParams(payload);

    return this.http.get<AnimalInterfaces.Receive.Filter>(
      `${environment.petBaseUrl}/api/Pets/filter`,
      { params }
    );
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.petBaseUrl}/api/Pets/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
