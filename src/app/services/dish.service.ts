import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { Comment } from '../shared/comment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { baseURL , mongoURL } from '../shared/baseurl'
import  { ProcessHttpmsgService } from './process-httpmsg.service'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'


@Injectable()
export class DishService {

  constructor( private http : HttpClient , private processHttpmsgService : ProcessHttpmsgService) { }

  getDishes(code : string) : Observable<Dish[]>
  {
    return this.http.get(mongoURL + 'order/getDishes/' + code)
            .catch(error => { return this.processHttpmsgService.handleError(error)})
  }
  getDish(id : number) : Observable<Dish>
  {
    return this.http.get(mongoURL + 'order/dishes/' + id)
            .catch(error => { return this.processHttpmsgService.handleError(error)})
  };
  
  addToCart(name : string) : Observable<any>
  {
      return this.http.post<any>(mongoURL + 'order/addToCart', 
      {"name": name})
      .map(res => {
        return {'success': res.success};
      })
        .catch(error => { return this.processHttpmsgService.handleError(error); });
  }

  makeOrder(stCode : string , trainNumber: string , pnr : string) : Observable<any>
  {
      return this.http.post<any>(mongoURL + 'order/makeOrder', 
      {"station": stCode , "trainNo" : trainNumber , "pnr" : pnr})
      .map(res => {
        return {'success': res.success};
      })
        .catch(error => { return this.processHttpmsgService.handleError(error); });
  }

  addComment(comment : Comment,id : number) : Observable<any>
  {
      return this.http.post<any>(mongoURL + 'order/addComment', 
      {"dishId": id, "rating": comment.rating , "comment" : comment.comment})
      .map(res => {
        return {'success': res.success, 'status' : res.status};
      })
        .catch(error => { return this.processHttpmsgService.handleError(error); });
  }
  getDishComment(id : number) : Observable<Comment[]>
  {
    return this.http.get(mongoURL + 'order/fetchComment/' + id)
            .catch(error => { return this.processHttpmsgService.handleError(error)})
  };

  getFeaturedDish() : Observable<Dish>
  {
    return this.http.get<Dish>(mongoURL + 'order/getFeaturedDish')
              .map(res => { return res;})
              .catch(error => { return this.processHttpmsgService.handleError(error)})

  };
}
