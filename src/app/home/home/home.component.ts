import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSubs: Subscription | undefined;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubs = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    })
  }
  ngOnDestroy() {
    this.userSubs?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
