import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {map , tap} from 'rxjs/operators';
import {ValueSensors} from './valueSensors.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  @Input() valueSensors : ValueSensors;
  saturation : number;
  constructor(  private httpClient: HttpClient ){};
  


  fetchData(){
     this.httpClient.get("https://neptune-test-6f3db.firebaseio.com/saturation.json")
     .pipe(tap(resData => {
     this.saturation = (Number(resData));
     })).subscribe();
     return this.httpClient.get("https://neptune-test-6f3db.firebaseio.com/heartRate.json")
     .pipe(tap(resData => {
     this.valueSensors ={date:new Date(), heartRate : Number(resData), saturation : this.saturation}
     console.log(this.valueSensors);
     }));
  }
}