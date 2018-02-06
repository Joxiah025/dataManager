import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { InviteePage } from '../invitee/invitee';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  public nodata: boolean = true;
  public events: any;
  public error: boolean = false;

  constructor(public loadCtrl: LoadingController,public alertCtrl: AlertController, public toast: ToastController, public fetchData: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.fetchEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  fetchEvents(){

    this.nodata = true;
    this.events = [];
    this.error = false;

    this.fetchData.getEvents().subscribe(
      (res) => {
        this.nodata = false;
        this.events = res;        
      },
      (err) => {
        // this.toast.create({
        //   message: "A network error occurred!",
        //   duration: 3000
        // }).present();
        this.error = true;
        this.nodata = false;
        this.events = err; 
      }
    );

  }

  reloadEvents(){
    this.alertCtrl.create({
      title: "Attention",
      message: "You're about to make a request to the server for recent events.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.fetchEvents();
            // console.log(this.activity.indexOf(item));
            // this.activity.splice(this.activity.indexOf(item), 1);
            // this.dataService.saveFt(this.activity).then(
            //   () => {
            //     this.fetchActivity();
            //   }
            // )            
          }
        }
      ]
    }).present();
  }



  goToEventDetails(item){
    // this.loadCtrl.create({
    //   spinner: 'crescent',
    //   dismissOnPageChange: true
    // }).present();    
    let loading = this.loadCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait...'
    });
  
    loading.present();
      this.navCtrl.push(InviteePage, item).then(() => {
      loading.dismiss();
    })
  }

}
