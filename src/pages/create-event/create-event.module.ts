import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEventPage } from './create-event';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEventPage),
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
export class CreateEventPageModule {}
