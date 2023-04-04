import {Component, OnInit} from '@angular/core';
import {RestService} from "../../rest.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  userDetails: any = [];
  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.restService.userDetails().subscribe((response: any) => {
      this.userDetails = response.data;
    })
  }
}
