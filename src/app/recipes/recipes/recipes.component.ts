import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";
import {map} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  recipeForm = new FormGroup({
    recipeName: new FormControl('', Validators.required),
    ingredient: new FormControl('')
  })

  recieps: any = [];

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  submit() {
    this.restService.createRecipe(this.recipeForm.value).subscribe((response: any) => {
      this.recipeForm.reset();
      this.getRecipes();
    })
  }

  getRecipes() {
    this.restService.getRecipes().pipe(map((response: any) => {
      const result = [];
      for(let key in response) {
        let obj = {id: key, ...response[key]};
        result.push(obj);
      }
      return result;
    })).subscribe((response) => {
      this.recieps = response;
    })
  }

}
