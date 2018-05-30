import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlaceUpdatePage } from './top-place-update';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TopPlaceUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceUpdatePage),
    FormsModule
  ],
})
export class TopPlaceUpdatePageModule {}
