import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCityPage } from './create-city';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    CreateCityPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCityPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class CreateCityPageModule {}
