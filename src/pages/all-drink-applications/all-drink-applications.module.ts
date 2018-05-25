import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDrinkApplicationsPage } from './all-drink-applications';

@NgModule({
  declarations: [
    AllDrinkApplicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDrinkApplicationsPage),
  ],
})
export class AllDrinkApplicationsPageModule {}
