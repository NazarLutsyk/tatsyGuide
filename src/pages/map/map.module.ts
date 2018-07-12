import {NgModule} from "@angular/core";
import {MapPage} from "./map";
import {IonicPageModule} from "ionic-angular";
import {AgmCoreModule} from "@agm/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    MapPage
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBGmyqfYXWuVBwLJFWiZiXJZ0zCgDawUqA"
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class MapModule {

}
