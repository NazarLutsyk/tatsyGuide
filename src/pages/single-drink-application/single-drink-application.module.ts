import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleDrinkApplicationPage } from './single-drink-application';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SingleDrinkApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleDrinkApplicationPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class SingleDrinkApplicationPageModule {}
