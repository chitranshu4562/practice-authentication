import {Component, OnInit} from '@angular/core';
import {RestService} from "./rest.service";
import {distinct} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-end';
  constructor(private restService: RestService) {
  }

  ngOnInit() {
  }
}
