import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {map , tap} from 'rxjs/operators';
import {ValueSensors} from './valueSensors.model' ;
import { ModalController } from '@ionic/angular';
import { HomeModalComponent } from './home-modal/home-modal.component';
import { IonicStorageModule } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    valueSensors: ValueSensors;
    age: number;
    saturation: number;
    constructor(private httpClient: HttpClient, public modalController: ModalController, public storage: Storage) { };


    setAge(age: number) {
        this.age = age;
    }
  
    async setData(key, value) {
        const res = await this.storage.set(key, value);
        console.log(res);
    }

    async getData(key) {
        const keyVal = await this.storage.get(key);
        console.log('Key is', keyVal);
    }
    


  fetchData(){
      this.httpClient.get("https://neptune-ad095.firebaseio.com/saturation/Data.json")
     .pipe(tap(resData => {
     this.saturation = (Number(resData));
     })).subscribe();
      return this.httpClient.get("https://neptune-ad095.firebaseio.com/heartRate/Data.json")
     .pipe(tap(resData => {
     this.valueSensors ={date:new Date(), heartRate : Number(resData), saturation : this.saturation}
         console.log(this.valueSensors);
         this.setData(String(this.valueSensors.date.getDate) + String(this.valueSensors.date.getMonth), this.valueSensors);
     }))

          ;
    }


    async presentModal() {
        const modal = await this.modalController.create({
            component: HomeModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'saturation': this.valueSensors.saturation,
                'heartRate': this.valueSensors.heartRate,
                'age': this.age,

            }
        });
        return await modal.present();
    }
}