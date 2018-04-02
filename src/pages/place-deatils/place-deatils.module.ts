import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceDeatilsPage } from './place-deatils';

@NgModule({
  declarations: [
    PlaceDeatilsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDeatilsPage),
  ],
})
export class PlaceDeatilsPageModule {}
