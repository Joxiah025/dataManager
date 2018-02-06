import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the ContactdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactdetails',
  templateUrl: 'contactdetails.html',
})
export class ContactdetailsPage {
  public fname;
  public sex;
  public pic;
  public type;
  public phone;
  public address;
  public email;
  public bus;
  public added_time;
  public active: boolean = false;
  constructor(private sms: SMS, public toastCtrl: ToastController, private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams) {
    this.fname = this.navParams.get('fname');
    this.sex = this.navParams.get('sex');
    this.pic = this.navParams.get('pic');
    this.type = this.navParams.get('type');
    this.phone = this.navParams.get('phone');
    this.address = this.navParams.get('address');
    this.bus = this.navParams.get('bus');
    this.email = this.navParams.get('email');
    this.added_time = this.navParams.get('added_time');

    this.active = true;
    console.log(this.sex);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactdetailsPage');
  }
  
  CallMember(tel){
    this.callNumber.callNumber(tel, true).then(
      () => {
        console.log("Call started!");
      }
    ).catch(
      (err) => {
        this.toastCtrl.create({
          message: "An error occurred while trying to place a call",
          position: "bottom",
          duration: 3000
        }).present();
      }
    )
  }

  SMSMember(tel){
    //CONFIGURATION
    var options = {
      android: {
          intent: 'INTENT'  // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
      }
    };
    
    this.sms.send(tel, "", options);    
  }

}
