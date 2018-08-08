import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllKitchensPage } from './all-kitchens';

@NgModule({
  declarations: [
    AllKitchensPage,
  ],
  imports: [
    IonicPageModule.forChild(AllKitchensPage),
  ],
})
export class AllKitchensPageModule {}
