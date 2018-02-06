import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteePage } from './invitee';

@NgModule({
  declarations: [
    InviteePage,
  ],
  imports: [
    IonicPageModule.forChild(InviteePage),
  ],
})
export class InviteePageModule {}
