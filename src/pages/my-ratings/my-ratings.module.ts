import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRatingsPage } from './my-ratings';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MyRatingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRatingsPage),
    ComponentsModule
  ],
})
export class MyRatingsPageModule {}
