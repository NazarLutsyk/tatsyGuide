import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePlacePage } from './update-place';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatExpansionModule} from "@angular/material";

@NgModule({
  declarations: [
    UpdatePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePlacePage),
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
export class UpdatePlacePageModule {}
