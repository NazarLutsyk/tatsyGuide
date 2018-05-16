import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlacePage } from './create-place';

@NgModule({
  declarations: [
    CreatePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePlacePage),
  ],
})
export class CreatePlacePageModule {}
