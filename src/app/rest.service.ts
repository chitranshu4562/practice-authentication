import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {exhaustMap, Subject, take} from "rxjs";
import {AuthService} from "./auth/auth.service";
import {User} from "./auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  userDetails() {
    return this.http.get(this.apiUrl + 'users/user_details');
  }

  createUser(data: any) {
    return this.http.post(this.apiUrl + 'users/create_user', data);
  }

  createRecipe(data: any) {
    return this.http.post('https://authproject-61f4e-default-rtdb.firebaseio.com/recipe.json', data);
  }

  getRecipes() {
    return this.http.get('https://authproject-61f4e-default-rtdb.firebaseio.com/recipe.json');
  }
}
