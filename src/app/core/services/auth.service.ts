import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth/';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore/';
import 'firebase/auth';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { PoToolbarProfile } from '@po-ui/ng-components';
import { UserGoogle } from '../models/user-google';

const ENDPOINT_LOGIN = '/api/auth/login';
const ENDPOINT_REGISTER = '/api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<unknown>;
  isLoggedFromGoogle;
  profile: PoToolbarProfile;
  userGoogle: UserGoogle = {
    displayName: '',
    email: '',
    uid: '',
    photoURL: ''
  };
  user;

  constructor(
    private http: HttpService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap( person => {
        if (person) {
          return this.afs.doc(`users/${person.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    );

   }

  login(email, password): Observable<any> {
    return this.http.post(environment.ip_port + ENDPOINT_LOGIN, {email, password});
  }

  get isLogged(): boolean {
    return this.getToken() ? true : false;
  }

  saveToken(token) {
    sessionStorage.setItem('user', token.token);
  }

  postGoogleUser({email, name}): Observable<any> {
    return this.http.post(environment.ip_port + ENDPOINT_LOGIN + 'sso', {email, name});
  }

  async setNotLogged() {
    sessionStorage.removeItem('user');
    this.isLoggedFromGoogle = false;
    await this.afAuth.signOut();
  }

  getToken() {
    return sessionStorage.getItem('user');
  }

  info(){
    return JSON.parse(atob(this.getToken().split('.')[1]));
  }

  async googleSignin() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    await this.afAuth.signInWithRedirect(provider);
  }

  redirectResult() {
    return firebase.default.auth().getRedirectResult();
  }

  postRegister(email, password, name, cpf, image): Observable<any> {
    return this.http
    .post(environment.ip_port + ENDPOINT_REGISTER,
    {email, password, name, cpf, image});
  }

  setProfile(title, subtitle) {
    return this.profile = {
      title,
      subtitle
    };
  }


}
