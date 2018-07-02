import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBonusesPage } from './all-bonuses';
import {ComponentsModule} from "../../components/components.module";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AllBonusesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBonusesPage),
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
export class AllBonusesPageModule {}
