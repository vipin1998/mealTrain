import { Component, OnInit ,Inject } from '@angular/core';

import { Dish } from '../shared/dish'

import {Params ,ActivatedRoute} from '@angular/router';

import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit 
{

  dishes : Dish[];
  errMess : string;
  cart : Dish[] = [];


  constructor(private dishService : DishService,private route : ActivatedRoute
    ,@Inject('MongoURL') private MongoURL) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dishService.getDishes(params['stCode']))
      .subscribe(dish => { this.dishes = dish;},
      errmess =>this.errMess = <any>errmess);
  } 

  addToCart(dish : Dish) 
  {
    this.cart.push(dish);
  } 

  removeFromCart(dish : Dish)
  {
    var index = this.cart.indexOf(dish);
    if (index > -1) {
      this.cart.splice(index, 1);
    
  }
  }

}
