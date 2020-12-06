import { Component } from '@angular/core';
import {HomeService} from './home.service';
import {Storage} from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   text = 'default';
   
  constructor(public homeService: HomeService , private storage : Storage, private splashScreen : SplashScreen) {
  }
  onChangeText(){
    this.text = 'Changed';
  }

  getDataSensors(){
    this.homeService.fetchData().subscribe();
    
  }
}