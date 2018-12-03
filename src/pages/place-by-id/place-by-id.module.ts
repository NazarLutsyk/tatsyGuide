import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceByIdPage } from './place-by-id';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PlaceByIdPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceByIdPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ComponentsModule,
  ],
})
export class PlaceByIdPageModule {}
