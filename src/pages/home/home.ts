import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { EventsPage } from '../events/events';
// import { ActivityPage } from '../activity/activity';
import { FirstTimerPage } from '../first-timer/first-timer';
import { ContactPage } from '../contact/contact';
import { Events } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { ContactdetailsPage } from "../contactdetails/contactdetails";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public act: boolean = false;
  public activity: any = "";
 
  constructor(public loadCtrl: LoadingController,private dataService: DataProvider, private event: Events, public navCtrl: NavController){
    this.fetchActivity();
    this.event.subscribe('user:created', () => this.fetchActivity());
  }

  ionViewWillEnter(){
    this.fetchActivity();
  }

  fetchActivity(){
    this.dataService.getFt().then(
      (res) => {
        if(res != null){
          this.act = true;
          this.activity = res.slice(-6).reverse();
       }        
      }
    )
  }
  gotoFirstTimers(){
    this.navCtrl.push(FirstTimerPage);
  }

  gotoContactDetails(item){
    let loading = this.loadCtrl.create({
      content: "Please Wait",
      spinner: 'crescent'
    });
    loading.present();
    this.navCtrl.push(ContactdetailsPage, item).then(
      () => {
        loading.dismiss();
      }
    );
  }

  // gotoActivities(){
  //   this.navCtrl.push(ActivityPage);
  // }

  gotoContacts(){
    this.navCtrl.push(ContactPage);
  }

  gotoEvents(){
    this.navCtrl.push(EventsPage);
  }
  
}
