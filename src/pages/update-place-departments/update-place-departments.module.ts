import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePlaceDepartmentsPage } from './update-place-departments';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
    UpdatePlaceDepartmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePlaceDepartmentsPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class UpdatePlaceDepartmentsPageModule {}
