import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleBonusePage } from './single-bonuse';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    SingleBonusePage,
  ],
  imports: [
    IonicPageModule.forChild(SingleBonusePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class SingleBonusePageModule {}
