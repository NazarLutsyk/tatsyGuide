import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalTestimonialPage } from './modal-testimonial';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ModalTestimonialPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalTestimonialPage),
     TranslateModule.forChild({
           loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
           }
         }),
  ],
})
export class ModalTestimonialPageModule {}
