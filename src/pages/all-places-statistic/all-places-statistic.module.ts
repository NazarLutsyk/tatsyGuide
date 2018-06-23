import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPlacesStatisticPage } from './all-places-statistic';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AllPlacesStatisticPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPlacesStatisticPage),
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
export class AllPlacesStatisticPageModule {}
