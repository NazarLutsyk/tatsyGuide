import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBonusesPage } from './all-bonuses';

@NgModule({
  declarations: [
    AllBonusesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBonusesPage),
  ],
})
export class AllBonusesPageModule {}
