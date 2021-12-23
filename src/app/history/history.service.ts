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

  size : string[];
  saturation :any [];
  item : any;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) { }
  
  fetchSize(){
    this.item = this.db.object('size/').valueChanges().subscribe((res: string) => {

      this.size = Object.values(res);
      
    })
   
   }

  
   

   getSaturation() {
    
     
    this.item = this.db.list('saturation/' ).valueChanges().subscribe(res => {
      console.log("size:");
      console.log(this.size);
      console.log(Object.values(res[0])[0]);
      
      let myChart = HighCharts.chart('chartSaturation', {
      chart: {
        borderColor: '#EBBA95',
        backgroundColor: 'grey',
        type: 'line'
      },
      title: {
        text: 'Saturation  history'
      },
      xAxis: {
        categories: [Object.values(res[8])[1], Object.values(res[9])[1], Object.values(res[10])[1]]

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
          data: [Object.values(res[10])[0], Object.values(res[9])[0], Object.values(res[8])[0]]
        }]
    });
  
    })
    
  
   
 }

 getHeartRate() {
    
     
  this.item = this.db.list('heartRate/' ).valueChanges().subscribe(res => {
    
    console.log(res);
    console.log (Object.values(res[0]));

    let myChart = HighCharts.chart('chartHeartRate', {
    chart: {
      borderColor: '#EBBA95',
      backgroundColor: 'grey',
      type: 'line'
    },
    title: {
      text: ' HeartRate history'
    },
    xAxis: {
      categories: [Object.values(res[8])[1], Object.values(res[9])[1], Object.values(res[10])[1]]

    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
      {
        name: 'heartRate',
        type: undefined,
        data: [Object.values(res[0]), Object.values(res[1]), Object.values(res[2])]
      }]
  });

  })
  

 
}



 }

   
    




