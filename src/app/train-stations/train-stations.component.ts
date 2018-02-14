import { Component, OnInit , Inject } from '@angular/core';
import { Station } from '../shared/station'
import { TrainService } from '../services/train.service'
import {Params ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-train-stations',
  templateUrl: './train-stations.component.html',
  styleUrls: ['./train-stations.component.scss']
})
export class TrainStationsComponent implements OnInit {

  allStations : Station[];
  trainStations : Station[];
  getAllStationError : string;
  getTrainStationError : string;

  constructor( private trainService : TrainService,
      private route : ActivatedRoute,
      @Inject('MongoURL') private MongoURL) { }

  ngOnInit() {
    this.trainService.getAllStations()
        .subscribe(stat => this.allStations = stat,
        errmess => this.getAllStationError = <any>errmess);

    this.route.params
    .switchMap((params: Params) => this.trainService.getTrainStation(+params['trainNumber']))
    .subscribe(stat => { this.trainStations = stat;} ,
      errmess => this.getTrainStationError = <any>errmess);    
  }
}
