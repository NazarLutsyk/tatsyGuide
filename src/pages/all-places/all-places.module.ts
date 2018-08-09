import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPlacesPage } from './all-places';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AllPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPlacesPage),
    ComponentsModule
  ],
})
export class AllPlacesPageModule {}
