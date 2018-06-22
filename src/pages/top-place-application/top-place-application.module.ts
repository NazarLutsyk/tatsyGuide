import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlaceApplicationPage } from './top-place-application';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TopPlaceApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceApplicationPage),
    FormsModule
  ],
})
export class TopPlaceApplicationPageModule {}
