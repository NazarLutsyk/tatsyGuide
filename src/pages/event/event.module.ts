import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventPage} from './event';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    MatExpansionModule
  ],
})
export class EventPageModule {
}
