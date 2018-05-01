import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PlaceDeatilsPage} from "./place-deatils";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    PlaceDeatilsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDeatilsPage),
    IonicStorageModule.forRoot(),
  ],

})
export class PlaceDetailsModule{}
