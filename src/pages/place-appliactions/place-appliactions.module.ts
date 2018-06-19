import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceAppliactionsPage } from './place-appliactions';
import {ComponentsModule} from "../../components/components.module";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PlaceAppliactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceAppliactionsPage),
    ComponentsModule,
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class PlaceAppliactionsPageModule {}
