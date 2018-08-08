import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllCitiesPage } from './all-cities';

@NgModule({
  declarations: [
    AllCitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllCitiesPage),
  ],
})
export class AllCitiesPageModule {}
