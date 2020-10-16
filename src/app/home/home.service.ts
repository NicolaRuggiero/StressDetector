import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}


  fetchDataSensors(){
    return this.http.get('http://192.168.1.191')
    .pipe(tap(resData =>{
      console.log(resData);
    }));
    
 }
}
