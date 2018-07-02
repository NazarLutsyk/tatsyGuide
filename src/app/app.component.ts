import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {PlaceTypeProvider} from "../providers/place-type/place-type";
import {PlacesProvider} from "../providers/places-service/PlacesProvider";
import {LoginPage} from "../pages/login/login";
import {GlobalConfigsService} from "../configs/GlobalConfigsService";
import {HttpClient} from "@angular/common/http";
import {AuthProvider} from "../providers/auth/auth";
import {Client} from "../models/client/Client";
import {zip} from "rxjs/observable/zip";
import {LangProvider} from "../providers/lang/lang";
import {CreatePlacePage} from "../pages/create-place/create-place";
import {MyPlacesPage} from "../pages/my-places/my-places";
import {MyFavoritePlacesPage} from "../pages/my-favorite-places/my-favorite-places";
import {MyRatingsPage} from "../pages/my-ratings/my-ratings";
import {PlaceTypeMultilangProvider} from "../providers/place-type-multilang/place-type-multilang";
import {ProfilePage} from "../pages/profile/profile";
import {ClientsPage} from "../pages/clients/clients";
import {PurgatoryPlacesPage} from "../pages/purgatory-places/purgatory-places";
import {AllEventsPage} from "../pages/all-events/all-events";
import {AllBonusesPage} from "../pages/all-bonuses/all-bonuses";
import {AllPlacesStatisticPage} from "../pages/all-places-statistic/all-places-statistic";
import {TopPlaceManagePage} from "../pages/top-place-manage/top-place-manage";
import {NgForm} from "@angular/forms";
import {Globalization} from '@ionic-native/globalization';
import {Geolocation} from "@ionic-native/geolocation";
import {PlaceTypesPage} from "../pages/place-types/place-types";
import {TranslateService} from "@ngx-translate/core";
import {Facebook} from "@ionic-native/facebook";
import {GooglePlus} from "@ionic-native/google-plus";


@Component({
  templateUrl: 'app.html',
  providers: []

})
export class MyApp implements OnInit {

  @ViewChild('myNav')
  navCtrl: NavController;
  rootPage: any;
  languageSwitcher: boolean = true;
  placeTypesM = [];
  searchObject = {
    range: {lower: 0, upper: 10000},
    direction: false,
    filterFeature: {wifi: false, karaoke: false, parking: false, vipRoom: false},
    placeType: '',
    city: ''
  };
  principal: Client = null;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private placeTypeService: PlaceTypeProvider,
              private placeService: PlacesProvider,
              private placeTYpeMultilangService: PlaceTypeMultilangProvider,
              private langService: LangProvider,
              private events: Events,
              private menuController: MenuController,
              private globalConfig: GlobalConfigsService,
              private http: HttpClient,
              private geolocation: Geolocation,
              private auth: AuthProvider,
              private globalization: Globalization,
              private translate: TranslateService,
              private fb: Facebook,
              private google: GooglePlus
  ) {


    platform
      .ready().then(() => {
        console.log('platform ready');
        statusBar.styleDefault();
        splashScreen.hide();
        if (platform.is("android") || platform.is("ios")) {
          this.globalization.getPreferredLanguage().then(res => {
            if (res.value.includes("ua") || res.value.includes("UA") || res.value.includes("ru") || res.value.includes("RU")) {
              this.globalConfig.deviceLang = "ua";
              this.languageSwitcher = true;
            } else {
              this.globalConfig.deviceLang = "en";
            }
            this.geolocation.getCurrentPosition().then((position) => {
              this.globalConfig.globalPosition.latitude = position.coords.latitude;
              this.globalConfig.globalPosition.longitude = position.coords.longitude;
              this.rootPage = HomePage;
            });
            console.log(this.globalConfig.getGlobalLang());
            this.translate.use(this.globalConfig.deviceLang);
          });
        } else {
          this.rootPage = HomePage;

        }

      }
    );

    // this.translate.setDefaultLang("en");
    // this.translate.use("ua");

  }

  ngOnInit() {
    console.log(this.principal, !!this.principal, 1);
    this.auth.principal.subscribe((principal) => {
      this.principal = principal;
      console.log(this.principal, !!this.principal, 2);
    });
    zip(
      this.auth.loadPrincipal(),
      this.placeTYpeMultilangService.find({
        query: {lang: this.globalConfig.getGlobalLang()},
        populate: [{path: 'placeType'}]
      })
    ).subscribe(([principal, placeTypesM]) => {
      this.placeTypesM = placeTypesM;
    }, (err) => {
      console.log(err);
    })
  }

  show(so) {
    this.events.publish('functionCall:find', so);
  }

  reset(form: NgForm) {
    this.searchObject = {
      range: {lower: 0, upper: 10000},
      direction: false,
      filterFeature: {wifi: false, karaoke: false, parking: false, vipRoom: false},
      placeType: '',
      city: ''
    };
    form.reset();
    this.show(this.searchObject);
  }

  goToLoginRegistration() {
    this.navCtrl.push(LoginPage);
    this.menuController.close();
  }


  logout() {
    let logoutPromise = new Promise(((resolve, reject) => resolve(true)));
    if (this.principal.facebookId) {
      console.log("FB");
      logoutPromise = this.fb.logout();
    } else if (this.principal.googleId) {
      console.log("GOOGLE+");
      this.google.logout().then(value => {
        console.log(value);
      }).catch(reason => {
        console.log(reason);
      });
      // logoutPromise = this.google.logout();
    }

    logoutPromise
      .then(() => {
        this.auth.logOut().subscribe(() => {
          this.principal = null;
          this.menuController.close();
          this.navCtrl.goToRoot({});
        }, (error) => {
          console.log(error);
        });
      })
      .catch(e => {
        console.log('Logout error', e);

      })
  }

  goToCreatePlacePage() {
    this.menuController.close();
    this.navCtrl.push(CreatePlacePage);
  }

  goToMyPlacesPage() {
    this.menuController.close();
    this.navCtrl.push(MyPlacesPage);
  }

  goToMyFavoritePlacesPage() {
    this.menuController.close();
    this.navCtrl.push(MyFavoritePlacesPage);
  }

  goToMyRatingsPage() {
    this.menuController.close();
    this.navCtrl.push(MyRatingsPage);
  }

  goToMyProfilePage() {
    this.menuController.close();
    this.navCtrl.push(ProfilePage);
  }

  goToClientsPage() {
    this.menuController.close();
    this.navCtrl.push(ClientsPage);
  }

  goToEventsPage() {
    this.menuController.close();
    this.navCtrl.push(AllEventsPage);
  }

  goToBonusesPage() {
    this.menuController.close();
    this.navCtrl.push(AllBonusesPage);
  }

  goToPlacesPurgatoryPage() {
    this.menuController.close();
    this.navCtrl.push(PurgatoryPlacesPage);
  }

  goToPlacesStatisticPage() {
    this.menuController.close();
    this.navCtrl.push(AllPlacesStatisticPage);
  }

  goToTopPlacesManagePage() {
    this.menuController.close();
    this.navCtrl.push(TopPlaceManagePage);
  }

  goToPlaceTypesPage() {
    this.menuController.close();
    this.navCtrl.push(PlaceTypesPage);
  }


  switchLang() {
    this.globalConfig.deviceLang = this.languageSwitcher ? "ua" : "en";
    this.translate.use(this.globalConfig.deviceLang);

  }
}


