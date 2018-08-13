import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceStatisticPage } from './place-statistic';
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    PlaceStatisticPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceStatisticPage),
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
export class PlaceStatisticPageModule {}
