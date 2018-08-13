import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UpdateCityPage} from './update-city';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    UpdateCityPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateCityPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class UpdateCityPageModule {
}
