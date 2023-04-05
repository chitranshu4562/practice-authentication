import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  user = new BehaviorSubject<User>(null);
  API_KEY = 'AIzaSyBDrps3aYsSGhZf7nx8nWTne9dzu3FO0FA';
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string | null, password: string | null) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
      'key=' + this.API_KEY, data)
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string | null, password: string | null) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?' +
      'key=' + this.API_KEY, data)
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errMessage = 'An unknown error occurred !!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email id has already been registered !!';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'This email id has not been registered yet !!';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'Invalid password !!';
        break;
    }
    return throwError(errMessage);
  }

  logout() {
    // @ts-ignore
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    // @ts-ignore
    const userData: any = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}
