import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log('Getting in Home component')
    this.authService.user.subscribe(response => {
      this.isAuthenticated = !response ? false : true;
      console.log('Is Authentication: ',this.isAuthenticated);
    })
  }
}
