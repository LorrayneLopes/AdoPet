import { HttpParams } from '@angular/common/http';

export function buildQueryParams(params: Record<string, any>): HttpParams {
  let payload: HttpParams = new HttpParams();

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      payload = payload.set(key, params[key]);
    }
  });

  return payload;
}
