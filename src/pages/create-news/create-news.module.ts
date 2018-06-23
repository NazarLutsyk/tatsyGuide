import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewsPage } from './create-news';
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    CreateNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewsPage),
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
export class CreateNewsPageModule {}
