import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UpdateEventPage} from './update-event';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UpdateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateEventPage),
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
export class UpdateEventPageModule {
}
