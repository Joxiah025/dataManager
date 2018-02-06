import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { ActivityPage } from '../pages/activity/activity';
import { FirstTimerPage } from '../pages/first-timer/first-timer';
import { InviteePage } from './../pages/invitee/invitee';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import {  IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { ContactdetailsPage } from '../pages/contactdetails/contactdetails';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirstTimerPage ,
    EventsPage,
    ActivityPage,
    InviteePage,
    ContactdetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirstTimerPage ,
    EventsPage,
    InviteePage,
    ActivityPage,
    ContactdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CallNumber,
    SMS,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
