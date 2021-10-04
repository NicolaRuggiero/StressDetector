import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import {ValueSensors} from '../home/valueSensors.model';
import {Injectable} from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  Sensors : ValueSensors[];
  size : number;
  saturation : number [];
  heartRate : number [];
  constructor(private httpClient: HttpClient ) { }


  ngOnInit(){
}

ionViewDidEnter() {

    this.httpClient.get("https://neptune-ad095.firebaseio.com/size.json")
     .pipe(tap(resData => {
     this.size = (Number(resData));
     })).subscribe();

     for(number i =0; i<this.size; i++){
        this.httpClient.get("https://neptune-ad095.firebaseio.com/saturation/" + i + "/Data.json")
        .pipe(tap(resData => {
        this.size = (Number(resData));
        })).subscribe();
     }

    this.plotSimpleBarChart();
  }

  plotSimpleBarChart() {
    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          type: undefined,
          data: [1, 0, 4]
        },
        {
          name: 'John',
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  }

}


