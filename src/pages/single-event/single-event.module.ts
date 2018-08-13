import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleEventPage } from './single-event';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    SingleEventPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleEventPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class SingleEventPageModule {}
