import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBonusesPage } from './all-bonuses';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AllBonusesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBonusesPage),
    ComponentsModule
  ],
})
export class AllBonusesPageModule {}
