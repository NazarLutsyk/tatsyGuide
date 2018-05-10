import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrinkerApplicationPage } from './drinker-application';

@NgModule({
  declarations: [
    DrinkerApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(DrinkerApplicationPage),
  ],
})
export class DrinkerApplicationPageModule {}
