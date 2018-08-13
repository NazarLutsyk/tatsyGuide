import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateKitchenPage } from './create-kitchen';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    CreateKitchenPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateKitchenPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class CreateKitchenPageModule {}
