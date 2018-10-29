import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPromosPage } from './all-promos';
import {ComponentsModule} from "../../components/components.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AllPromosPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPromosPage),
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
export class AllPromosPageModule {}
