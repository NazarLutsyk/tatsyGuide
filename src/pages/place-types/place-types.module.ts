import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceTypesPage } from './place-types';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
    PlaceTypesPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceTypesPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class PlaceTypesPageModule {}
