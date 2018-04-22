import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {PlacesProvider} from '../providers/places-service/PlacesProvider';
import {HttpClientModule} from "@angular/common/http";
import {PlaceDeatilsPage} from "../pages/place-deatils/place-deatils";
import {MapPage} from "../pages/map/map";
import {AgmCoreModule} from "@agm/core";
import {BonuseProvider} from '../providers/bonuse/bonuseProvider';
import {PlaceTypeProvider} from '../providers/place-type/place-type';
import {EventProvider} from "../providers/event/EventProvider";
import {NewsProvider} from "../providers/news/NewsProvider";
import {ComplaintProvider} from "../providers/complaint/complaint-provider";
import {DrinkApplicationProvider} from "../providers/drinkApplication/drinkApplication-provider";
import {RatingProvider} from "../providers/rating/rating-provider";
import {DepartmentProvider} from "../providers/department/department-provider";
import {ClientProvider} from "../providers/client/ClientProvider";
import {EventPage} from "../pages/event/event";
import {BonusePage} from "../pages/bonuse/bonuse";
import {NewsPage} from "../pages/news/news";
import {PlaceInfoPage} from "../pages/place-info/place-info";
import {GlobalConfigsService} from "../configs/GlobalConfigsService";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaceDeatilsPage,
    MapPage,
    EventPage,
    BonusePage,
    NewsPage,
    PlaceInfoPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBGmyqfYXWuVBwLJFWiZiXJZ0zCgDawUqA"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlaceDeatilsPage,
    MapPage,
    EventPage,
    BonusePage,
    NewsPage,
    PlaceInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesProvider,
    BonuseProvider,
    PlaceTypeProvider,
    EventProvider,
    NewsProvider,
    ComplaintProvider,
    DrinkApplicationProvider,
    RatingProvider,
    DepartmentProvider,
    ClientProvider,
    GlobalConfigsService
  ]
})
export class AppModule {
}
