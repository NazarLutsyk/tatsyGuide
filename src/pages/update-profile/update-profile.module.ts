import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UpdateProfilePage} from './update-profile';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UpdateProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProfilePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class UpdateProfilePageModule {
}
