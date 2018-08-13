import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChooseLocationPage} from './choose-location';
import {AgmCoreModule} from "@agm/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    ChooseLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLocationPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBGmyqfYXWuVBwLJFWiZiXJZ0zCgDawUqA"
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class ChooseLocationPageModule {
}
