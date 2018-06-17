import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalChooseLangPage } from './modal-choose-lang';
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ModalChooseLangPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalChooseLangPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class ModalChooseLangPageModule {}
