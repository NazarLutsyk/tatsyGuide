import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignUpPage} from './sign-up';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    TranslateModule,
    // TranslateModule.forChild({
    //       loader: {
    //         provide: TranslateLoader,
    //         useFactory: createTranslateLoader,
    //         deps: [HttpClient]
    //       }
    //     }),
    FormsModule
  ],
})
export class SignUpPageModule {
}
