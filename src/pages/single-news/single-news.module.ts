import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleNewsPage } from './single-news';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    SingleNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleNewsPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class SingleNewsPageModule {}
