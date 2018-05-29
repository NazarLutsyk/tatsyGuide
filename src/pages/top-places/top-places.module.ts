import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlacesPage } from './top-places';

@NgModule({
  declarations: [
    TopPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlacesPage),
  ],
})
export class TopPlacesPageModule {}
