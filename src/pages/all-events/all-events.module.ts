import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEventsPage } from './all-events';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AllEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllEventsPage),
    ComponentsModule
  ],
})
export class AllEventsPageModule {}
