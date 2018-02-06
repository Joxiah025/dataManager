import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstTimerPage } from './first-timer';

@NgModule({
  declarations: [
    FirstTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstTimerPage),
  ],
})
export class FirstTimerPageModule {}
