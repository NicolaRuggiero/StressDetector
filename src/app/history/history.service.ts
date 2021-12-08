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
   
   }

  
   

   getSaturation() {
    
     
    this.item = this.db.list('saturation/' ).valueChanges().subscribe(res => {
      
      console.log(res);
      console.log (Object.values(res[0]));

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
          data: [Object.values(res[0]), Object.values(res[1]), Object.values(res[2])]
        },
        {
          name: 'heartrate',
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  
    })
    
  
   
 }
 }

   
    




