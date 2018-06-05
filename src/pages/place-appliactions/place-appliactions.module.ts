import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceAppliactionsPage } from './place-appliactions';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PlaceAppliactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceAppliactionsPage),
    ComponentsModule
  ],
})
export class PlaceAppliactionsPageModule {}
