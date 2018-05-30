import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MyApp} from './app.component';
import {PlacesProvider} from '../providers/places-service/PlacesProvider';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {HomePageModule} from "../pages/home/home.module";
import {PlaceDetailsModule} from "../pages/place-deatils/place-details.module";
import {MapModule} from "../pages/map/map.module";
import {EventPageModule} from "../pages/event/event.module";
import {BonusePageModule} from "../pages/bonuse/bonuse.module";
import {NewsPageModule} from "../pages/news/news.module";
import {PlaceInfoPageModule} from "../pages/place-info/place-info.module";
import {TestimonialPageModule} from "../pages/testimonial/testimonial.module";
import {LoginPageModule} from "../pages/login/login.module";
import {SignUpPageModule} from "../pages/sign-up/sign-up.module";
import {SignInPageModule} from "../pages/sign-in/sign-in.module";
import {NativePageTransitions} from '@ionic-native/native-page-transitions';
import {DrinkerApplicationPageModule} from "../pages/drinker-application/drinker-application.module";
import {MessageProvider} from '../providers/message/message';
import {TopPlaceProvider} from '../providers/top-place/top-place';
import {BonuseMultilangProvider} from '../providers/bonuse-multilang/bonuse-multilang';
import {EventMultilangProvider} from '../providers/event-multilang/event-multilang';
import {NewsMultilangProvider} from '../providers/news-multilang/news-multilang';
import {PlaceMultilangProvider} from '../providers/place-multilang/place-multilang';
import {PlaceTypeMultilangProvider} from '../providers/place-type-multilang/place-type-multilang';
import {AuthProvider} from '../providers/auth/auth';
import {HttpInterceptorProvider} from '../providers/http-interceptor/http-interceptor';
import {LangProvider} from '../providers/lang/lang';
import {ModalTestimonialPageModule} from "../pages/modal-testimonial/modal-testimonial.module";
import {CreatePlacePageModule} from "../pages/create-place/create-place.module";
/*file transfer etc*/
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Camera} from '@ionic-native/camera';
import {MyPlacesPageModule} from "../pages/my-places/my-places.module";
import {MyFavoritePlacesPageModule} from "../pages/my-favorite-places/my-favorite-places.module";
import {MyRatingsPageModule} from "../pages/my-ratings/my-ratings.module";
import {ChooseLocationPageModule} from "../pages/choose-location/choose-location.module";
import {AddAvatarAndPhotosPageModule} from "../pages/add-avatar-and-photos/add-avatar-and-photos.module";
import {ImagePicker} from "@ionic-native/image-picker";
import {Base64} from "@ionic-native/base64";
import {CreateEventPageModule} from "../pages/create-event/create-event.module";
import {CreateBonusePageModule} from "../pages/create-bonuse/create-bonuse.module";
import {CreateNewsPageModule} from "../pages/create-news/create-news.module";
import {UpdateEventPageModule} from "../pages/update-event/update-event.module";
import {UpdateBonusePageModule} from "../pages/update-bonuse/update-bonuse.module";
import {UpdateNewsPageModule} from "../pages/update-news/update-news.module";
import {UpdateRatingPageModule} from "../pages/update-rating/update-rating.module";
import {UpdatePlacePageModule} from "../pages/update-place/update-place.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {UpdateProfilePageModule} from "../pages/update-profile/update-profile.module";
import {MailProvider} from '../providers/mail/mail';
import {PlaceAppliactionsPageModule} from "../pages/place-appliactions/place-appliactions.module";
import {UpdateDrinkApplicationPageModule} from "../pages/update-drink-application/update-drink-application.module";
import {ClientsPageModule} from "../pages/clients/clients.module";
import {PurgatoryPlacesPageModule} from "../pages/purgatory-places/purgatory-places.module";
import {AllNewsPageModule} from "../pages/all-news/all-news.module";
import {AllEventsPageModule} from "../pages/all-events/all-events.module";
import {AllBonusesPageModule} from "../pages/all-bonuses/all-bonuses.module";
import {AllDrinkApplicationsPageModule} from "../pages/all-drink-applications/all-drink-applications.module";
import {HashTagsPageModule} from "../pages/hash-tags/hash-tags.module";
import {PlaceStatisticPageModule} from "../pages/place-statistic/place-statistic.module";
import {ReviewProvider} from '../providers/review/review';
import {UpdatePlaceDepartmentsPageModule} from "../pages/update-place-departments/update-place-departments.module";
import {AllPlacesStatisticPageModule} from "../pages/all-places-statistic/all-places-statistic.module";
import {TopPlacesPageModule} from "../pages/top-places/top-places.module";
import {TopPlaceManagePageModule} from "../pages/top-place-manage/top-place-manage.module";
import {TopPlaceUpdatePageModule} from "../pages/top-place-update/top-place-update.module";
import {AllPlacesPageModule} from "../pages/all-places/all-places.module";

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
    DrinkerApplicationPageModule,
    ModalTestimonialPageModule,
    CreatePlacePageModule,
    MyPlacesPageModule,
    MyFavoritePlacesPageModule,
    MyRatingsPageModule,
    ChooseLocationPageModule,
    AddAvatarAndPhotosPageModule,
    CreateEventPageModule,
    CreateBonusePageModule,
    CreateNewsPageModule,
    UpdateEventPageModule,
    UpdateBonusePageModule,
    UpdateNewsPageModule,
    UpdateRatingPageModule,
    UpdatePlacePageModule,
    ProfilePageModule,
    UpdateProfilePageModule,
    UpdateDrinkApplicationPageModule,
    PlaceAppliactionsPageModule,
    ClientsPageModule,
    PurgatoryPlacesPageModule,
    AllNewsPageModule,
    AllEventsPageModule,
    AllBonusesPageModule,
    AllDrinkApplicationsPageModule,
    HashTagsPageModule,
    PlaceStatisticPageModule,
    UpdatePlaceDepartmentsPageModule,
    AllPlacesStatisticPageModule,
    TopPlacesPageModule,
    TopPlaceManagePageModule,
    TopPlaceUpdatePageModule,
    AllPlacesPageModule,
    TopPlacesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [],
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
    NativePageTransitions,
    AuthProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true
    },
    LangProvider,
    MessageProvider,
    TopPlaceProvider,
    BonuseMultilangProvider,
    EventMultilangProvider,
    NewsMultilangProvider,
    PlaceMultilangProvider,
    PlaceTypeMultilangProvider,
    FileTransfer,
    // FileUploadOptions, ???
    FileTransferObject,
    File,
    Camera,
    ImagePicker,
    Base64,
    MailProvider,
    ReviewProvider
  ]
})
export class AppModule {
}
