import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPromosPage } from './all-promos';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AllPromosPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPromosPage),
    ComponentsModule
  ],
})
export class AllPromosPageModule {}
