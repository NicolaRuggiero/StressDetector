import { Injectable } from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import {map , tap} from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import { Observable } from '@firebase/util';



@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  size : string;
  saturation :any [];
  item : any;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) { }
  
  fetchSize(){
    this.item = this.db.object('size/').valueChanges().subscribe((res: string) => {
      this.size=res.valueOf();
      console.log(res.valueOf());
      })
      console.log(this.size);
      console.log(this.item.value);
   }

  
   

   getSaturation() {
    
     for( var i =0 ; i< Number(this.size); i++) {
    this.saturation[i] = this.db.object('saturation/' + String(i) + '/Data').valueChanges().subscribe(res => {
      this.saturation[i]=Number(res);
    })
    console.log(this.saturation[i]);
  }
   
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




