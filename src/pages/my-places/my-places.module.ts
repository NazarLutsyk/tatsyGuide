import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPlacesPage } from './my-places';

@NgModule({
  declarations: [
    MyPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPlacesPage),
  ],
})
export class MyPlacesPageModule {}
