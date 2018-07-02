import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBonusePage } from './create-bonuse';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreateBonusePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBonusePage),
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
export class CreateBonusePageModule {}
