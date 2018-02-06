import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FirstTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-timer',
  templateUrl: 'first-timer.html',
})
export class FirstTimerPage {
  public src = "assets/imgs/donor-icon.png";
  public myForm: FormGroup;
  public ft = [];
  constructor(public alertCtrl: AlertController,private event: Events, private camera: Camera, private dataService: DataProvider, public formBuilder: FormBuilder,public toastCtrl: ToastController, public loadCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = formBuilder.group({
        fname: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        sex: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required,Validators.email])],
        address: ['', Validators.compose([Validators.required])],
        bus: ['', Validators.compose([Validators.required])],
        pic: [''] ,
        type: [''] ,
        event: [''],
        uploaded:[],
        added_time: ['']    
    });
    this.dataService.getFt().then(
      (res) => {
        this.ft = (res) ? res : [];
        
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstTimerPage');
  }

  
  takePhoto(){

    try{
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
        
        this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.src = base64Image;
        this.myForm.controls['pic'].patchValue(base64Image);
        
        }, (err) => {
        // Handle error
          // let toast = this.toastCtrl.create({
          //   message: 'Oops! an error occurred in camera.',
          //   duration: 3000,
          //   position: 'top'
          // });
          // toast.present();
        });
      }
      catch(e){
        let toast = this.toastCtrl.create({
          message: 'Oops! an error occurred in camera.',
          duration: 3000,
          position: 'top'
        });
        toast.present();        
      }
  }


  saveInput(val){

    //this.submitAttempt = true;
    console.log(val);

    let loader = this.loadCtrl.create({
      content: "Please wait...",
      spinner: "crescent"
    });
    loader.present();

    if(!this.myForm.valid){
        loader.dismiss();
        let toast = this.alertCtrl.create({
          message: 'All fields are required!',
          title: 'Attention',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        toast.present();
     }else{
       this.myForm.controls['type'].patchValue('First Timer');
       this.myForm.controls['uploaded'].patchValue(false);
       this.myForm.controls['added_time'].patchValue(new Date().toLocaleDateString());
      
       this.ft.push(this.myForm.value);
       this.dataService.saveFt(this.ft).then((resp) => {
          this.event.publish('user:created');
          loader.dismiss();
          let toast = this.alertCtrl.create({
              message: 'First timer successfully saved!',
              title: 'Successful',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
          });
          toast.present();
          this.src = "assets/imgs/donor-icon.png";
          this.myForm.reset();        
        });
        // , (error) => {
        //   loader.dismiss();
        //     let toast = this.toastCtrl.create({
        //         message: 'Oops! poor internet connection',
        //         duration: 3000,
        //         position: 'top'
        //       });
        //    toast.present();
        // }
      
      }

  }

}
