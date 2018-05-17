import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFavoritePlacesPage } from './my-favorite-places';

@NgModule({
  declarations: [
    MyFavoritePlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFavoritePlacesPage),
  ],
})
export class MyFavoritePlacesPageModule {}
