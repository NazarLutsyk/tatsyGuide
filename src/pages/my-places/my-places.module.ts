import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPlacesPage } from './my-places';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MyPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPlacesPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class MyPlacesPageModule {}
