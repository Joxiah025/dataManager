import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { ContactdetailsPage } from "../contactdetails/contactdetails";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public act: boolean = false;
  public activity: any = "";
  public users: any;
 
  constructor(public toastCtrl: ToastController,public loadCtrl: LoadingController,public alertCtrl: AlertController, private dataService: DataProvider, private event: Events, public navCtrl: NavController){
    this.fetchActivity();
    this.event.subscribe('user:created', () => this.fetchActivity());
    this.dataService.getUser().then(
      res => {
        this.users = res;
      }
    )
  }

  ionViewWillEnter(){
    this.fetchActivity();
  }

  fetchActivity(){
    this.dataService.getFt().then(
      (res) => {
        if(res != null){
          this.act = true;
          this.activity = res;
       }        
      }
    )
  }

  gotoContactDetails(item){
    let loading = this.loadCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait'
    });
    loading.present();
    this.navCtrl.push(ContactdetailsPage, item).then(
      () => {
        loading.dismiss();
      }
    );
   
  }

  deleteContact(item){
    let alert = this.alertCtrl.create({
      title: 'Attention',
      message: 'Are you sure you want to delete this contact?',
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
            console.log(this.activity.indexOf(item));
            this.activity.splice(this.activity.indexOf(item), 1);
            this.dataService.saveFt(this.activity).then(
              () => {
                this.fetchActivity();
              }
            )            
          }
        }
      ]
    });
    alert.present();
  }

  searchContact(ev) {
    // Reset items back to all of the items
    //this.initializeAttendance();
    // set val to the value of the ev target
    var val = ev.target.value;
    // let trav = this.activity;

    // if the value is an empty string don't filter the items
    if (val) {
      console.log(val);
      this.activity = this.activity.filter((item) => {
        return (item.fname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
       //this.initializeAttendance();
       this.fetchActivity();
    }

  }

  uploadContact(item){
    let alert = this.alertCtrl.create({
      title: 'Attention',
      message: 'You are about to upload this contact to the server!',
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
            let loading = this.loadCtrl.create({
              content: 'Please Wait',
              spinner: 'crescent'
            });

            loading.present();
            this.dataService.uploadContact(this.users,item,item.pic).subscribe(
              () => {
                let index = this.activity.indexOf(item);
                console.log(index);
                if(index > -1){
                    this.activity[index].uploaded = true;
                  }
                
                this.dataService.saveFt(this.activity).then(
                  () => {
                    loading.dismiss();
                    this.fetchActivity();
                    this.alertCtrl.create({
                      title: 'Successful',
                      message: 'You have successfully uploaded this contact to the server!',
                      buttons: [                        
                        {
                          text: 'Ok',
                          handler: () => {

                          }
                        }
                      ]}).present();
                  }
                )
              },
              () => {
                loading.dismiss()
                this.toastCtrl.create({
                  message: "A network error occurred!",
                  duration: 3000
                }).present();
              }
            )            
          }
        }
      ]
    });
    alert.present();
  }


}
