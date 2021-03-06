import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlaceUpdatePage } from './top-place-update';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TopPlaceUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceUpdatePage),
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
export class TopPlaceUpdatePageModule {}
