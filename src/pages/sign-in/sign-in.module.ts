import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInPage } from './sign-in';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class SignInPageModule {}
