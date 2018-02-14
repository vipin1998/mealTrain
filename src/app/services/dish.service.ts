import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import { baseURL } from '../shared/baseurl'

import  { ProcessHttpmsgService } from './process-httpmsg.service'

import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'


@Injectable()
export class DishService {

  constructor( private http : HttpClient , private processHttpmsgService : ProcessHttpmsgService) { }

  getDishes() : Observable<Dish[]>
  {
    return this.http.get(baseURL + 'dishes')
            .catch(error => { return this.processHttpmsgService.handleError(error)})
  }
  getDish(id : number) : Observable<Dish>
  {
    return this.http.get(baseURL + 'dishes/' + id)
            .catch(error => { return this.processHttpmsgService.handleError(error)})
  };

  getFeaturedDish() : Observable<Dish>
  {
    return this.http.get(baseURL + 'dishes?featured=true')
                .map(dishes => dishes[0])
                .catch(error => { return this.processHttpmsgService.handleError(error)})

  };
  getDishIds(): Observable<number[]> {
    return this.getDishes()
    .map(dishes => { return dishes.map(dish => dish.id)})
  }
}
