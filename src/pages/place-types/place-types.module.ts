import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceTypesPage } from './place-types';

@NgModule({
  declarations: [
    PlaceTypesPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceTypesPage),
  ],
})
export class PlaceTypesPageModule {}
