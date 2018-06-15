import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePlaceTypePage } from './update-place-type';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UpdatePlaceTypePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePlaceTypePage),
    FormsModule
  ],
})
export class UpdatePlaceTypePageModule {}
