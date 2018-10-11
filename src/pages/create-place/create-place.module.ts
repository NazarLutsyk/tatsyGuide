import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreatePlacePage} from './create-place';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatExpansionModule} from "@angular/material";

@NgModule({
  declarations: [
    CreatePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePlacePage),
    MatExpansionModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class CreatePlacePageModule {
}
