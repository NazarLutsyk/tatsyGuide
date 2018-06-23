import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UpdateBonusePage} from './update-bonuse';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UpdateBonusePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateBonusePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class UpdateBonusePageModule {
}
