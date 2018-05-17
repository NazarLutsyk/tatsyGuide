import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRatingsPage } from './my-ratings';

@NgModule({
  declarations: [
    MyRatingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRatingsPage),
  ],
})
export class MyRatingsPageModule {}
