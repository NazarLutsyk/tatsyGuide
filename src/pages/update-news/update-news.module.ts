import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateNewsPage } from './update-news';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UpdateNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateNewsPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class UpdateNewsPageModule {}
