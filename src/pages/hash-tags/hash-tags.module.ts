import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HashTagsPage } from './hash-tags';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    HashTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(HashTagsPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class HashTagsPageModule {}
