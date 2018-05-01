import {NgModule} from "@angular/core";
import {MapPage} from "./map";
import {IonicPageModule} from "ionic-angular";
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [
    MapPage
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBGmyqfYXWuVBwLJFWiZiXJZ0zCgDawUqA"
    }),
  ]
})
export class MapModule {

}
