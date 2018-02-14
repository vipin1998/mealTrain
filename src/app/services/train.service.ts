import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  { ProcessHttpmsgService } from './process-httpmsg.service'
import { Observable } from 'rxjs/Observable'
import { mongoURL } from '../shared/baseurl'
import { Station } from '../shared/station'

import 'rxjs/add/operator/catch'

@Injectable()
export class TrainService {

  constructor( private http : HttpClient, 
               private processHttpmsgService : ProcessHttpmsgService) { }

  getAllStations() : Observable<Station[]>{

      return this.http.get(mongoURL + 'train/allStations')
        .catch(error => { return this.processHttpmsgService.handleError(error); });
  }

  getTrainStation( trainNumber : number) : Observable<Station[]>{
    return this.http.get(mongoURL + 'train/query/' + trainNumber)
    .catch(error => { return this.processHttpmsgService.handleError(error); });
    
    
  }

}
 