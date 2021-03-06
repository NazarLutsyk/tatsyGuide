import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MyApp} from './app.component';
import {PlacesProvider} from '../providers/places-service/PlacesProvider';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
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
import {DrinkApplicationCommentProvider} from '../providers/drinkApplicationComment/drink-application-comment-provider';
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
import {SingleDrinkApplicationPageModule} from "../pages/single-drink-application/single-drink-application.module";
import {ModalChooseLangPageModule} from "../pages/modal-choose-lang/modal-choose-lang.module";
import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from "@ionic-native/google-plus";
import {FormsModule} from "@angular/forms";
import {Globalization} from "@ionic-native/globalization";
import {CreateTopPlacePageModule} from "../pages/create-top-place/create-top-place.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {PlaceTypesPageModule} from "../pages/place-types/place-types.module";
import {UpdatePlaceTypePageModule} from "../pages/update-place-type/update-place-type.module";
import {CreatePlaceTypePageModule} from "../pages/create-place-type/create-place-type.module";
import {SingleNewsPageModule} from "../pages/single-news/single-news.module";
import {SingleBonusePageModule} from "../pages/single-bonuse/single-bonuse.module";
import {SingleEventPageModule} from "../pages/single-event/single-event.module";
import {PopoverPageModule} from "../pages/popover/popover.module";
import {TopPlaceApplicationPageModule} from "../pages/top-place-application/top-place-application.module";
import {CityProvider} from '../providers/city/city';
import {CityMultilangProvider} from '../providers/city-multilang/city-multilang';
import {KitchenProvider} from '../providers/kitchen/kitchen';
import {KitchenMultilangProvider} from '../providers/kitchen-multilang/kitchen-multilang';
import {TopCategoryMultilangProvider} from '../providers/top-category-multilang/top-category-multilang';
import {TopCategoryProvider} from '../providers/top-category/top-category';
import {AllKitchensPageModule} from "../pages/all-kitchens/all-kitchens.module";
import {AllTopCategoriesPageModule} from "../pages/all-top-categories/all-top-categories.module";
import {AllCitiesPageModule} from "../pages/all-cities/all-cities.module";
import {CreateKitchenPageModule} from "../pages/create-kitchen/create-kitchen.module";
import {UpdateKitchenPageModule} from "../pages/update-kitchen/update-kitchen.module";
import {CreateCityPageModule} from "../pages/create-city/create-city.module";
import {UpdateCityPageModule} from "../pages/update-city/update-city.module";
import {CreateTopCategoryPageModule} from "../pages/create-top-category/create-top-category.module";
import {UpdateTopCategoryPageModule} from "../pages/update-top-category/update-top-category.module";
import {PromoProvider} from '../providers/promo/promo';
import {AllPromosPageModule} from "../pages/all-promos/all-promos.module";
import {DateTimePickerConfigProvider} from '../providers/date-time-picker-config/date-time-picker-config';
import {SearchCityModalPageModule} from "../pages/search-city-modal/search-city-modal.module";
import {Diagnostic} from "@ionic-native/diagnostic";
import {PipesModule} from "../pipes/pipes.module";
import {RecoverPasspordPageModule} from "../pages/recover-passpord/recover-passpord.module";
import {PlaceByIdPageModule} from "../pages/place-by-id/place-by-id.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    FormsModule,
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
    AllDrinkApplicationsPageModule,
    HashTagsPageModule,
    PlaceStatisticPageModule,
    UpdatePlaceDepartmentsPageModule,
    AllPlacesStatisticPageModule,
    TopPlacesPageModule,
    TopPlaceManagePageModule,
    TopPlaceUpdatePageModule,
    AllPlacesPageModule,
    SingleDrinkApplicationPageModule,
    ModalChooseLangPageModule,
    CreateTopPlacePageModule,
    PlaceTypesPageModule,
    UpdatePlaceTypePageModule,
    CreatePlaceTypePageModule,
    SingleNewsPageModule,
    SingleBonusePageModule,
    SingleEventPageModule,
    PopoverPageModule,
    TopPlaceApplicationPageModule,
    AllKitchensPageModule,
    AllTopCategoriesPageModule,
    AllCitiesPageModule,
    CreateKitchenPageModule,
    UpdateKitchenPageModule,
    CreateCityPageModule,
    UpdateCityPageModule,
    CreateTopCategoryPageModule,
    UpdateTopCategoryPageModule,
    AllPromosPageModule,
    PipesModule,
    RecoverPasspordPageModule,
    PlaceByIdPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
        SearchCityModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [],
  providers: [
    GooglePlus,
    Facebook,
    Diagnostic,
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
    DrinkApplicationCommentProvider,
    TopPlaceProvider,
    BonuseMultilangProvider,
    EventMultilangProvider,
    NewsMultilangProvider,
    PlaceMultilangProvider,
    PlaceTypeMultilangProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    ImagePicker,
    Base64,
    MailProvider,
    ReviewProvider,
    Globalization,
    CityProvider,
    CityMultilangProvider,
    KitchenProvider,
    KitchenMultilangProvider,
    TopCategoryProvider,
    TopCategoryMultilangProvider,
    PromoProvider,
    DateTimePickerConfigProvider,
  ],
  exports: [

    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // }).ngModule
  ]
})

export class AppModule {
}
