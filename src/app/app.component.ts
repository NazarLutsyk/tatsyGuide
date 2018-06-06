import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
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


@Component({
  templateUrl: 'app.html',
  providers: []

})
export class MyApp implements OnInit {

  @ViewChild('myNav')
  navCtrl: NavController;

  rootPage: any = HomePage;
  placeTypesM = [];
  searchObject = {
    range: {lower: 0, upper: 10000},
    direction: false,
    filterFeature: {wifi: false, karaoke: false, parking: false, vipRoom: false},
    placeType: ''
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
              private _ngZone: NgZone,
              private auth: AuthProvider
  ) {
    platform
      .ready().then(
      () => {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    );
    this.globalConfig.langService = this.langService;
  }

  ngOnInit() {
    this.auth.principal.subscribe((principal) => {
      this.principal = principal;
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
      placeType: ''
    };
    form.reset();
    this.show(this.searchObject);
  }

  goToLoginRegistration() {
    this.navCtrl.push(LoginPage);
    this.menuController.close();
  }


  logout() {
    this.auth.logOut().subscribe((data) => {
      this.principal = null;
      this.menuController.close();
      this.navCtrl.goToRoot({});
    }, (error) => {
      console.log(error);
    });

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
}


