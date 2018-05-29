import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPlacesStatisticPage } from './all-places-statistic';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AllPlacesStatisticPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPlacesStatisticPage),
    FormsModule
  ],
})
export class AllPlacesStatisticPageModule {}
