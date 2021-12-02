import { Injectable } from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import {map , tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  size : number;
  saturation :number [];

  constructor(private httpClient: HttpClient) { }
  
  fetchSize(){
	    return this.httpClient.get("https://neptune-ad095.firebaseio.com/size.json")
     .pipe(tap(resData => {
     this.size = (Number(resData));
     console.log(this.size);
     }));
     
  }

  fetchSaturation(){
      console.log(this.size);
      for(let i =0 ; i< this.size; i++){
       this.getSaturation(i).subscribe();
    }
     
   }

   getSaturation(i:number){

    return this.httpClient.get("https://neptune-ad095.firebaseio.com/saturation/" + String(i) + "/Data.json")
      .pipe(tap(resData => {
      this.saturation[i] = (Number(resData));
      console.log(this.saturation[i]);
      }));
   }

   plotSimpleBarChart() {
    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Saturation and heartrate history'
      },
      xAxis: {
        
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [
        {
          name: 'saturation',
          type: undefined,
          data: [this.saturation]
        },
        {
          name: 'heartrate',
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  }

  
 }   


