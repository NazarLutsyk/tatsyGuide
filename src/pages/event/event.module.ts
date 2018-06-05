import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventPage} from './event';
import {MatExpansionModule} from '@angular/material/expansion';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    MatExpansionModule,
    ComponentsModule
  ],
})
export class EventPageModule {
}
