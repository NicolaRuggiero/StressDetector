import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {map , tap} from 'rxjs/operators';
import {ValueSensors} from './valueSensors.model' ;
import { ModalController } from '@ionic/angular';
import { HomeModalComponent } from './home-modal/home-modal.component';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    
    age: number;
    saturation: any;
    heartRate:any;
    size : any;
    items: Observable<any[]>;
    constructor(private httpClient: HttpClient, public modalController: ModalController, public storage: Storage, private db: AngularFireDatabase) { };


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
    
      this.size = this.db.object('size/').valueChanges().subscribe(res => {
      console.log("this is the size of database:" + String(res));
        this.size=  String(res);
      });

      this.size = String(this.size);
      console.log(this.size);

       this.db.object('saturation/' + this.size + '/Data').valueChanges().subscribe(res => {
         console.log("saturation: " + String(res));
        this.saturation=Number(res);
      })
      this.db.object('heartRate/' + this.size + '/Data').valueChanges().subscribe(res => {
        console.log("heartRate: " + String(res));
        this.heartRate=Number(res);
      })
          
          
    }


    async presentModal() {
        const modal = await this.modalController.create({
            component: HomeModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'age': this.age,

            }
        });
        return await modal.present();
    }
}