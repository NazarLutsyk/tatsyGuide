import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlaceTypePage } from './create-place-type';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreatePlaceTypePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePlaceTypePage),
    FormsModule
  ],
})
export class CreatePlaceTypePageModule {}
