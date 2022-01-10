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
        //backgroundColor: 'grey',
        type: 'line'
      },
      title: {
        text: 'Saturation  history'
      },
      xAxis: {
        categories: [Object.values(res[res.length-1])[1], Object.values(res[res.length-2])[1], Object.values(res[res.length-3])[1], Object.values(res[res.length-4])[1], Object.values(res[res.length-5])[1], Object.values(res[res.length-6])[1],Object.values(res[res.length-7])[1], Object.values(res[res.length-8])[1], Object.values(res[res.length-9])[1], Object.values(res[res.length-10])[1]]

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
          data: [Object.values(res[res.length-1])[0], Object.values(res[res.length-2])[0], Object.values(res[res.length-3])[0], Object.values(res[res.length-4])[0], Object.values(res[res.length-5])[0], Object.values(res[res.length-6])[0],Object.values(res[res.length-7])[0], Object.values(res[res.length-8])[0], Object.values(res[res.length-9])[0], Object.values(res[res.length-10])[0]]
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
      categories: [Object.values(res[res.length-1])[1], Object.values(res[res.length-2])[1], Object.values(res[res.length-3])[1], Object.values(res[res.length-4])[1], Object.values(res[res.length-5])[1], Object.values(res[res.length-6])[1],Object.values(res[res.length-7])[1], Object.values(res[res.length-8])[1], Object.values(res[res.length-9])[1], Object.values(res[res.length-10])[1]]

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
        data: [Object.values(res[res.length-1])[0], Object.values(res[res.length-2])[0], Object.values(res[res.length-3])[0], Object.values(res[res.length-4])[0], Object.values(res[res.length-5])[0], Object.values(res[res.length-6])[0],Object.values(res[res.length-7])[0], Object.values(res[res.length-8])[0], Object.values(res[res.length-9])[0], Object.values(res[res.length-10])[0]]
      }]
  });

  })
  

 
}



 }

   
    




