import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateRatingPage } from './update-rating';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    UpdateRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateRatingPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class UpdateRatingPageModule {}
