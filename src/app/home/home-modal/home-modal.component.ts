import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'app-home-modal',
    templateUrl: './home-modal.component.html',
    styleUrls: ['./home-modal.component.scss'],
})
export class HomeModalComponent implements OnInit {
     saturation: any;
     heartRate: any;
     size : any;
     barLoader : boolean;
     value : number;
     currentDate : any;
     tmp : boolean;
     date : any;
    @Input() age: number;
    messageBPM: string;
    messageSaturation: string;
    constructor(private http: HttpClient, private db: AngularFireDatabase , public modalController: ModalController) { }

    close(){
        this.modalController.dismiss();
    }
     
    showProgressBar() {
        this.barLoader = true;
      }
    
      hideProgressBar() {
        this.barLoader = false;
      }

      addPbar(i) {
        setTimeout(() => {
          let apc = (i / 100)
          this.value = apc;
        }, 30 * i);
      }
    
      initeProgressBar() {
        this.showProgressBar()
        for (let index = 0; index <= 100; index++) {
          this.addPbar(+index);
        }
      }    

     sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
         }

      async ngOnInit() {
         this.showProgressBar();
         this.http.put("https://neptune-ad095.firebaseio.com/using.json", 1, {})
            .subscribe(data => {
                console.log(data);
            }, error => {
                console.log(error);
            });    
          
          await this.sleep(15000);
          
          this.currentDate = new Date();

          console.log(this.currentDate); 

          console.log("currentDate month:" + this.currentDate.getMonth());

          
         this.size =  this.db.object('size/').valueChanges().subscribe(res => {
         console.log("this is the size of database:" + String(res));
         this.size=  String(res);


         
         

            

            this.saturation =  this.db.list('saturation/' + this.size ).valueChanges().subscribe(res => {
            console.log("saturation: " + String(res[0]));
            console.log("timestamp-month:" + Number(String(res[1]).substring(5,7)));
            console.log("actual month:" + Number(this.currentDate.getMonth()));

             
              this.saturation=Number(res[0]);
           })
          
         

        

         this.saturation =  this.db.list('saturation/' + this.size ).valueChanges().subscribe(res => {

         console.log("saturation: " + String(res[0]));
         console.log("Full FirebaseDate: " + String(res[1]));

         this.date = String(res[1]);
         this.saturation=Number(res[0]);
         })

         this.heartRate =  this.db.object('heartRate/' + this.size + '/Data').valueChanges().subscribe(res => {
         console.log("heartRate: " + String(res));
         this.heartRate=Number(res);

         if (Number(this.saturation) >= 96) {
              this.messageSaturation = "La tua saturazione è ottimale "
             }

            if (this.age == 1 && Number(this.heartRate) <= 90) {
            this.messageBPM = " I bpm dell'ultimo test risultano inferiori, ti consigliamo quindi di sottoporre il soggeto a un controllo medico. "
             }
    
             if (this.age <= 8 && this.age > 1 && Number(this.heartRate) <= 70) {
              this.messageBPM = "Il tuo ultimo test ha mostrato un battito più lento rispetto alla norma, ti consigliamo di chiamare un genitore e di avvertire il tuo dottore. "
            }

            if (this.age <= 8 && this.age > 1 && Number(this.heartRate) >= 110) {
                this.messageBPM = "Il tuo battito cardiaco risulta accellerato, potrebbe essere dovuto a attività motoria o a eccitazione, ti consigliamo comunque di dirlo a un tuo genitore e di avvertire il tuo dottore. "
            }

            if (this.age > 8  && Number(this.heartRate) <= 60) {
                this.messageBPM = "  Il tuo battito cardiaco risulta inferiore alla norma, ti consigliamo di consultare il tuo medico curante, o personale sanitario"
            }

            if (this.age > 8  && Number(this.heartRate) >= 110){
                this.messageBPM = "Il tuo battito cardiaco risulta più accellerato della norma, potrebbe essere tuttavia dovuto a una situazione momentanea di ansia, paura, eccitazione ecc... ecc.. . Se i valori si ripetono, ti consigliamo di consultare il tuo medico curante "
            }

            if (Number(this.saturation) <= 90) {
                this.messageSaturation = "La tua saturazione è pericolosamente bassa, ti consigliamo di chiamare subito qualcuno e di farti portare a fare un controllo medico"
            }

            if (Number(this.saturation) > 90 && Number(this.saturation) < 94) {
                this.messageSaturation = "La tua saturazione risulta leggermente bassa. Potrebbe essere tuttavia solo una situazione momentanea e di bassa gravità. Se tali valori si ripetono spesso mantenendo un valore inferiore a 94, ti consigliamo di consultare il tuo medico curante"
            }

            if(this.heartRate <= 90 && this.heartRate >= 60){
                this.messageBPM = "Il battito cardiaco è ottimale"
            }
          })

            
          
             this.sleep(10000);

             this.http.put("https://neptune-ad095.firebaseio.com/using.json", 0, {})
            .subscribe(data => {
                console.log("using:" +data);
            }, error => {
                console.log(error);
            });
    
      });

      this.hideProgressBar();
 }

      

       
      
          
          
          

        
        

}


