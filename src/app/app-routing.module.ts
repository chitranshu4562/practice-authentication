import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./users/users-list/users-list.component";
import {AuthenticationComponent} from "./auth/authentication/authentication.component";
import {RecipesComponent} from "./recipes/recipes/recipes.component";

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent},
  { path: 'auth', component: AuthenticationComponent},
  { path: 'user-list', component: UsersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
