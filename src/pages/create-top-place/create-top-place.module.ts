import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreateTopPlacePage} from './create-top-place';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreateTopPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTopPlacePage),
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
export class CreateTopPlacePageModule {
}
