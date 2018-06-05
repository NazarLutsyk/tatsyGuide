import {NgModule} from '@angular/core';
import {DrinkApplicationComponent} from './drink-application/drink-application';
import {IonicModule} from "ionic-angular";
import {CommonModule} from "@angular/common";
import {NewsComponent} from './news/news';
import { BonuseComponent } from './bonuse/bonuse';
import { EventComponent } from './event/event';
import { RatingComponent } from './rating/rating';

@NgModule({
  declarations: [
    DrinkApplicationComponent,
    NewsComponent,
    BonuseComponent,
    EventComponent,
    RatingComponent,
  ],
  imports: [CommonModule, IonicModule],
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
