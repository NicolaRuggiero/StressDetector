import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import { HomeModalComponent } from './home/home-modal/home-modal.component';



import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeService } from './home/home.service';
import {IonicStorageModule} from '@ionic/storage';


import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeModalComponent],
  entryComponents: [],
  imports: [BrowserModule,
  HttpClientModule, 
  IonicModule.forRoot(), 
  AppRoutingModule,
  IonicStorageModule.forRoot(),
  AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CommonModule
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HomeService,
    Deeplinks,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
