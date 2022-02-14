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

   openUrl1(){ window.open('https://it.wikipedia.org/wiki/Saturazione_arteriosa_dell%27ossigeno', '_system'); }
   openUrl2(){ window.open('https://it.wikipedia.org/wiki/Frequenza_cardiaca', '_system'); }
   openUrl3(){ window.open('https://www.salute.gov.it/', '_system'); }

  closeModal(){
        this.homeService.closeModal();
  }

   
}
