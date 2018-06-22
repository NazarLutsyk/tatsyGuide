import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlaceManagePage } from './top-place-manage';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TopPlaceManagePage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceManagePage),
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
export class TopPlaceManagePageModule {}
