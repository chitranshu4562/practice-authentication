import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CreateUserComponent } from './users/create-user/create-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { HomeComponent } from './home/home/home.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    CreateUserComponent,
    AuthenticationComponent,
    HomeComponent,
    RecipesComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
