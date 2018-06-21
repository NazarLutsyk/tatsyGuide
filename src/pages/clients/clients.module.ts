import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class ClientsPageModule {}
