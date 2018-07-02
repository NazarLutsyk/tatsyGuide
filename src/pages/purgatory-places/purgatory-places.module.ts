import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurgatoryPlacesPage } from './purgatory-places';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PurgatoryPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(PurgatoryPlacesPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class PurgatoryPlacesPageModule {}
