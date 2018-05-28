import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceStatisticPage } from './place-statistic';

@NgModule({
  declarations: [
    PlaceStatisticPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceStatisticPage),
  ],
})
export class PlaceStatisticPageModule {}
