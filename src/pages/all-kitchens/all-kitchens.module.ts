import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AllKitchensPage} from './all-kitchens';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AllKitchensPage,
  ],
  imports: [
    IonicPageModule.forChild(AllKitchensPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class AllKitchensPageModule {
}
