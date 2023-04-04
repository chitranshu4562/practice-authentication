import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {MessageService} from "../../utils/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  mode = 'Login';
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }

  onSwitchingMode() {
    this.isLoginMode = !this.isLoginMode;
    this.mode = this.isLoginMode ? 'Login' : 'Sign Up';
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;
    const email = this.authForm.controls.email.value;
    const password = this.authForm.controls.password.value;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(authResponse => {
      this.isLoading = false;
      this.router.navigate(['']);
    }, errorRes => {
      console.error(errorRes);
      this.messageService.displayErrorMessage(errorRes);
      // this.error = errorRes;
      this.isLoading = false;
    })
    this.authForm.reset();
  }
}
