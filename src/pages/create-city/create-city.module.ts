import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCityPage } from './create-city';

@NgModule({
  declarations: [
    CreateCityPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCityPage),
  ],
})
export class CreateCityPageModule {}
