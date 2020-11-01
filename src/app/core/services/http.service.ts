import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(endpoint: string, queryParams = {}): Observable<any> {
    const params = new HttpParams({
      fromObject: queryParams
    });
    return this.http.get(endpoint, { params, observe: 'body' }).pipe(take(1));
  }

  public post(endpoint: string, payload: object = {}, queryParams = {}): Observable<any> {
    const params = new HttpParams({
      fromObject: queryParams
    });
    return this.http.post(endpoint, payload, { params }).pipe(take(1));
  }
}
