import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrinkerApplicationPage } from './drinker-application';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DrinkerApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(DrinkerApplicationPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class DrinkerApplicationPageModule {}
