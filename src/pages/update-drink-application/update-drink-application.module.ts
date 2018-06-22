import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateDrinkApplicationPage } from './update-drink-application';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UpdateDrinkApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateDrinkApplicationPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class UpdateDrinkApplicationPageModule {}
