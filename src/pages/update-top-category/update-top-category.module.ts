import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateTopCategoryPage } from './update-top-category';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    UpdateTopCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateTopCategoryPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class UpdateTopCategoryPageModule {}
