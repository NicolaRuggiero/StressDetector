import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import {ValueSensors} from '../home/valueSensors.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  displaySensors : ValueSensors[];
  constructor( ) { }


  ngOnInit(){
}

passDataSensors(valueSensors : ValueSensors){
	this.displaySensors.push(valueSensors);
}
}


