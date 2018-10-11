import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AllPlacesPage} from './all-places';
import {ComponentsModule} from "../../components/components.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AllPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPlacesPage),
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
export class AllPlacesPageModule {
}
