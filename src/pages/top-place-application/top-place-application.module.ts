import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TopPlaceApplicationPage} from './top-place-application';
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    TopPlaceApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceApplicationPage),
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class TopPlaceApplicationPageModule {
}
