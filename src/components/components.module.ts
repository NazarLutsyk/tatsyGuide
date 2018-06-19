import {NgModule} from '@angular/core';
import {DrinkApplicationComponent} from './drink-application/drink-application';
import {IonicModule} from "ionic-angular";
import {CommonModule} from "@angular/common";
import {NewsComponent} from './news/news';
import { BonuseComponent } from './bonuse/bonuse';
import { EventComponent } from './event/event';
import { RatingComponent } from './rating/rating';
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DrinkApplicationComponent,
    NewsComponent,
    BonuseComponent,
    EventComponent,
    RatingComponent,
  ],
  imports: [CommonModule, IonicModule ,  TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),],
  exports: [
    DrinkApplicationComponent,
    NewsComponent,
    BonuseComponent,
    EventComponent,
    RatingComponent,
  ]
})
export class ComponentsModule {
}
