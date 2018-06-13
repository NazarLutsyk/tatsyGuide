import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomePage} from "./home";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    FormsModule,
    TranslateModule.forChild()
  ],
})
export class HomePageModule {}
