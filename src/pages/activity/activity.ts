import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from "../../providers/data/data";
import { Events } from 'ionic-angular/util/events';
import { HomePage } from '../home/home';


/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  public myForm : FormGroup;
  constructor(public events: Events, public dataService: DataProvider, public alert: AlertController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = formBuilder.group({
      fname: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      added_time: ['']    
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  ionViewWillEnter(){
    this.dataService.getUser().then(
      (res) => {
        if(res){
          this.navCtrl.setRoot(HomePage);
        }
      }
    )
  }

  saveInput(form){
    if(!this.myForm.valid){
      this.alert.create({
        title: "Attention",
        message: "All required entries were not provided",
        buttons: [
          // {
          //   text: 'Cancel',
          //   role: 'cancel',
          //   handler: () => {
          //     console.log('Cancel clicked');
          //   }
          // },
          {
            text: 'Ok',
            handler: () => {
                          
            }
          }
        ]
      }).present()
    }else{
      this.dataService.saveUser(this.myForm.value).then(
        ()=>{
          this.events.publish("userRegistered");
          this.navCtrl.setRoot(HomePage);
        }
      )
    }
  }

}
