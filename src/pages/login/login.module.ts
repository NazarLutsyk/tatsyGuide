import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class LoginPageModule {}
