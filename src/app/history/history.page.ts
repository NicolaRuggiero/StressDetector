import { Component, OnInit } from '@angular/core';
import {ValueSensors} from '../home/valueSensors.model';
import {Injectable} from '@angular/core';
import * as HighCharts from 'highcharts';
import {HistoryService} from './history.service';
import {map , tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
  constructor(private historyService  : HistoryService, private httpClient: HttpClient) { }


  ngOnInit(){
}

ionViewDidEnter() {
  

<<<<<<< HEAD
      this.historyService.fetchSize().subscribe();
      this.historyService.fetchSaturation();
      this.historyService.plotSimpleBarChart();
=======
    this.httpClient.get("https://neptune-ad095.firebaseio.com/size.json")
     .pipe(tap(resData => {
     this.size = (Number(resData));
     })).subscribe();

     for(let i=0; i<this.size; i++){
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
>>>>>>> 4c15a157396cbbde500adcc998379e222d44a716
  }

  
}


