import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleDrinkApplicationPage } from './single-drink-application';

@NgModule({
  declarations: [
    SingleDrinkApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleDrinkApplicationPage),
  ],
})
export class SingleDrinkApplicationPageModule {}
