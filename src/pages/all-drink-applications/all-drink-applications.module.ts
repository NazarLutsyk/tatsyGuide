import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDrinkApplicationsPage } from './all-drink-applications';
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "../../../node_modules/@angular/common/http";

@NgModule({
  declarations: [
    AllDrinkApplicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDrinkApplicationsPage),
    FormsModule,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class AllDrinkApplicationsPageModule {}
