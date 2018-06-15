import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleEventPage } from './single-event';

@NgModule({
  declarations: [
    SingleEventPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleEventPage),
  ],
})
export class SingleEventPageModule {}
