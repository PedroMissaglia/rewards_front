import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

const ENDPOINT = '/api/auth/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  login(email, password): Observable<any> {
    return this.http.post(environment.ip_port + ENDPOINT, {email, password});
  }

  get isLogged(): boolean {
    return sessionStorage.getItem('user') ? true : false;
  }

  saveToken(token) {
    sessionStorage.setItem('user', token.token);
  }

  setNotLogged(): void {
    sessionStorage.removeItem('user');
  }

  getToken() {
    return sessionStorage.getItem('user');
  }

  info(){
    return JSON.parse(atob(this.getToken().split('.')[1]));
  }

}
