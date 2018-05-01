import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceInfoPage } from './place-info';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    PlaceInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceInfoPage),
    MatExpansionModule,
  ],
})
export class PlaceInfoPageModule {}
