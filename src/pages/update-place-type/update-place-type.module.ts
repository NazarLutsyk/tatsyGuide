import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePlaceTypePage } from './update-place-type';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UpdatePlaceTypePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePlaceTypePage),
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
export class UpdatePlaceTypePageModule {}
