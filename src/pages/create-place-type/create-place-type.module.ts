import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlaceTypePage } from './create-place-type';
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
    CreatePlaceTypePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePlaceTypePage),
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
export class CreatePlaceTypePageModule {}
