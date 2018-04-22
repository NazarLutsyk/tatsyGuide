import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceInfoPage } from './place-info';

@NgModule({
  declarations: [
    PlaceInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceInfoPage),
  ],
})
export class PlaceInfoPageModule {}
