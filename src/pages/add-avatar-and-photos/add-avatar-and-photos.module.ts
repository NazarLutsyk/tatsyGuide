import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAvatarAndPhotosPage } from './add-avatar-and-photos';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AddAvatarAndPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAvatarAndPhotosPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class AddAvatarAndPhotosPageModule {}
