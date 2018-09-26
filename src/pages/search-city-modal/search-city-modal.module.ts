import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SearchCityModalPage} from './search-city-modal';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    SearchCityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchCityModalPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class SearchCityModalPageModule {
}
