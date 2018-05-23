import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateEventPage } from './update-event';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UpdateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateEventPage),
    FormsModule
  ],
})
export class UpdateEventPageModule {}
