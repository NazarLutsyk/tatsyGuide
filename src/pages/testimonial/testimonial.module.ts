import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TestimonialPage} from './testimonial';
import {ComponentsModule} from "../../components/components.module";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TestimonialPage,
  ],
  imports: [
    IonicPageModule.forChild(TestimonialPage),
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
export class TestimonialPageModule {
}
