import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {User} from "./user.model";

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

  user = new Subject<User>();
  API_KEY = 'AIzaSyBDrps3aYsSGhZf7nx8nWTne9dzu3FO0FA';
  constructor(private http: HttpClient) {
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
}