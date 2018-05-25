import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEventsPage } from './all-events';

@NgModule({
  declarations: [
    AllEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllEventsPage),
  ],
})
export class AllEventsPageModule {}
