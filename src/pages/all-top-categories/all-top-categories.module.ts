import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllTopCategoriesPage } from './all-top-categories';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AllTopCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllTopCategoriesPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class AllTopCategoriesPageModule {}
