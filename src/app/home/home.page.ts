import { Component } from '@angular/core';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   text = 'default';
  constructor(private homeService: HomeService) {}
  onChangeText(){
    this.text = 'Changed';
  }

  ionViewWillEnter(){
    this.homeService.fetchDataSensors;
  }

}
