import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChooseLocationPage} from './choose-location';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    ChooseLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLocationPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBGmyqfYXWuVBwLJFWiZiXJZ0zCgDawUqA"
    }),
  ],
})
export class ChooseLocationPageModule {
}
