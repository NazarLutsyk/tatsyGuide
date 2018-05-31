import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDrinkApplicationsPage } from './all-drink-applications';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AllDrinkApplicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDrinkApplicationsPage),
    FormsModule
  ],
})
export class AllDrinkApplicationsPageModule {}
