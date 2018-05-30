import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlaceManagePage } from './top-place-manage';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TopPlaceManagePage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceManagePage),
    FormsModule
  ],
})
export class TopPlaceManagePageModule {}
