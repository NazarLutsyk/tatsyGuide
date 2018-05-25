import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurgatoryPlacesPage } from './purgatory-places';

@NgModule({
  declarations: [
    PurgatoryPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(PurgatoryPlacesPage),
  ],
})
export class PurgatoryPlacesPageModule {}
