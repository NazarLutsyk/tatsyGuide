import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewsPage } from './create-news';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreateNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewsPage),
    FormsModule
  ],
})
export class CreateNewsPageModule {}
