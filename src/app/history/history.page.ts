import { Component, OnInit } from '@angular/core';
import {ValueSensors} from '../home/valueSensors.model';
import {Injectable} from '@angular/core';
import * as HighCharts from 'highcharts';
import {HistoryService} from './history.service';
import {map } from 'rxjs/operators';
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
  

      this.historyService.fetchSize();
      this.historyService.getSaturation();
      this.historyService.plotSimpleBarChart();
  }

  
}


