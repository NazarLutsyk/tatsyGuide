import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    TranslateModule
     // TranslateModule.forChild({
     //       loader: {
     //         provide: TranslateLoader,
     //         useFactory: createTranslateLoader,
     //         deps: [HttpClient]
     //       }
     //     }),
  ],
})
export class SignUpPageModule {}
