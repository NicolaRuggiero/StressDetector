import { Injectable } from '@angular/core';
import {ValueSensors} from '../home/valueSensors.model';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import {map , tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  size : number;

  constructor(private httpClient: HttpClient) { }
  
  fetchData(){
	  return this.httpClient.get("https://neptune-ad095.firebaseio.com/size.json")
     .pipe(tap(resData => {
     this.size = (Number(resData));
     })).subscribe();
  }

}
