import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPlacesPage } from './all-places';

@NgModule({
  declarations: [
    AllPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPlacesPage),
  ],
})
export class AllPlacesPageModule {}
