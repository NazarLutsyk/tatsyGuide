import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PlaceDeatilsPage} from "./place-deatils";
import {IonicStorageModule} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PlaceDeatilsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDeatilsPage),
    IonicStorageModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule
  ],

})
export class PlaceDetailsModule{}
