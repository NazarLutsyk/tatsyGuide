import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDrinkApplicationsPage } from './all-drink-applications';
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AllDrinkApplicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDrinkApplicationsPage),
    FormsModule,
    ComponentsModule
  ],
})
export class AllDrinkApplicationsPageModule {}
