import { Component } from '@angular/core';
import {RestService} from "../../rest.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private restService: RestService) {
  }

  createUser() {
    this.restService.createUser(this.userForm.value).subscribe((response: any) => {
    })
  }
}
