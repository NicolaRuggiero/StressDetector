import { Component } from '@angular/core';
import {HomeService} from './home.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    text = 'default';
    age: number;
   
  constructor(public homeService: HomeService ) {
  }
  onChangeText(){
    this.text = 'Changed';
  }

  getDataSensors(){
      
      this.homeService.presentModal();
      this.homeService.setAge(this.age);
    }
}
