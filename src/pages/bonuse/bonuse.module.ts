import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BonusePage} from './bonuse';
import {MatExpansionModule} from '@angular/material/expansion';
import {ComponentsModule} from "../../components/components.module";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    BonusePage,
  ],
  imports: [
    IonicPageModule.forChild(BonusePage),
    MatExpansionModule,
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
export class BonusePageModule {}
