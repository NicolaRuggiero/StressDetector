import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-home-modal',
    templateUrl: './home-modal.component.html',
    styleUrls: ['./home-modal.component.scss'],
})
export class HomeModalComponent implements OnInit {
    @Input() saturation: string;
    @Input() heartRate: string;
    @Input() age: number;
    messageBPM: string;
    messageSaturation: string;
    constructor(private http: HttpClient) { }

    ngOnInit() {
        
        if (Number(this.saturation) >= 94) {
              this.messageSaturation = "La tua saturazione è ottimale "
        }

        if (this.age == 1 && Number(this.heartRate) <= 90) {
            this.messageBPM = "Per i  neonati di eta fino a 12 mesi, è considerato accettabile un battito cardiaco compreso tra i 90 e i 160 bpm. I bpm dell'ultimo test risultano inferiori, ti consigliamo quindi di sottoporre il soggeto a un controllo medico. "
        }

        if (this.age <= 8 && this.age > 1 && Number(this.heartRate) <= 70) {
            this.messageBPM = "Per i bambini di era compresa tra 1 e 8 anni è considerato in salute un battito cardiaco compreso tra i 70 e i 110 bpm. Il tuo ultimo test ha mostrato un battito più lento rispetto alla norma, ti consigliamo di chiamare un genitore e di avvertire il tuo dottore. "
        }

        if (this.age <= 8 && this.age > 1 && Number(this.heartRate) >= 110) {
            this.messageBPM = "Il tuo battito cardiaco risulta accellerato, potrebbe essere dovuto a attività motoria o a eccitazione, ti consigliamo comunque di dirlo a un tuo genitore e di avvertire il tuo dottore. "
        }

        if (this.age > 8  && Number(this.heartRate) <= 60) {
            this.messageBPM = "Il tuo battito cardiaco risulta piu lento della norma. Per un individuo adulto, di eta compresa tra gli 8 e i 65 anni si considera un battito regolare compreso quello compreso tra i 60 e i 90 bpm. Ti consigliamo di consultare il tuo medico curante"
        }

        if (this.age > 8  && Number(this.heartRate) >= 110){
            this.messageBPM = "Il tuo battito cardiaco risulta piu accellerato della norma, potrebbe essere tuttavia dovuto a una situazione momentanea di ansia, paura, eccitazione ecc... ecc.. oppure all'attivita motoria recente. Se non rientri in questi casi, ti consigliamo di consultare il tuo medico curante "
        }

        if (Number(this.saturation) <= 90) {
            this.messageSaturation = "La tua saturazione è pericolosamente bassa, ti consigliamo di chiamare subito qualcuno e di farti portare a fare un controllo medico"
        }

        if (Number(this.saturation) > 90 && Number(this.saturation) < 94) {
            this.messageSaturation = "La tua saturazione risulta leggermente bassa. Potrebbe essere tuttavia solo una situazione momentanea e di bassa gravita. Se tali valori si ripetono spesso mantenendo un valore inferiore a 94, ti consigliamo di consultare il tuo medico curante"
        }

        

        return this.http.put("https://neptune-ad095.firebaseio.com/using.json", 1, {})
            .subscribe(data => {
                console.log(data);
            }, error => {
                console.log(error);
            });
    }

}


