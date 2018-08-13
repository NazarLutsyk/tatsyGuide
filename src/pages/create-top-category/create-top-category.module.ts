import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTopCategoryPage } from './create-top-category';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    CreateTopCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTopCategoryPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class CreateTopCategoryPageModule {}
