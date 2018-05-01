import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';

import {MyApp} from './app.component';
import {PlacesProvider} from '../providers/places-service/PlacesProvider';
import {HttpClientModule} from "@angular/common/http";
import {BonuseProvider} from '../providers/bonuse/bonuseProvider';
import {PlaceTypeProvider} from '../providers/place-type/place-type';
import {EventProvider} from "../providers/event/EventProvider";
import {NewsProvider} from "../providers/news/NewsProvider";
import {ComplaintProvider} from "../providers/complaint/complaint-provider";
import {DrinkApplicationProvider} from "../providers/drinkApplication/drinkApplication-provider";
import {RatingProvider} from "../providers/rating/rating-provider";
import {DepartmentProvider} from "../providers/department/department-provider";
import {ClientProvider} from "../providers/client/ClientProvider";
import {GlobalConfigsService} from "../configs/GlobalConfigsService";
import {Geolocation} from '@ionic-native/geolocation';
import {TestimonialPage} from "../pages/testimonial/testimonial";
import {HomePageModule} from "../pages/home/home.module";
import {PlaceDetailsModule} from "../pages/place-deatils/place-details.module";
import {MapModule} from "../pages/map/map.module";
import {EventPageModule} from "../pages/event/event.module";
import {BonusePageModule} from "../pages/bonuse/bonuse.module";
import {NewsPageModule} from "../pages/news/news.module";
import {PlaceInfoPageModule} from "../pages/place-info/place-info.module";
import {TestimonialPageModule} from "../pages/testimonial/testimonial.module";
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {SignUpPageModule} from "../pages/sign-up/sign-up.module";
import {SignInPageModule} from "../pages/sign-in/sign-in.module";


@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HomePageModule,
    PlaceDetailsModule,
    MapModule,
    EventPageModule,
    BonusePageModule,
    NewsPageModule,
    PlaceInfoPageModule,
    TestimonialPageModule,
    LoginPageModule,
    SignUpPageModule,
    SignInPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [

    TestimonialPage
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
    GlobalConfigsService,
    Geolocation,
  ]
})
export class AppModule {
}
