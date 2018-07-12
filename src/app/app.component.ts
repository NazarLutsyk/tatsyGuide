import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform, ToastController} from 'ionic-angular';
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
import {Subject} from "rxjs/Subject";
import {Storage} from "@ionic/storage";


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
  doneSubject = new Subject();
  getLang = false;
  getLocation = false;

  constructor(public platform: Platform,
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
              private google: GooglePlus,
              private storage: Storage,
              private toastLang: ToastController
  ) {

    console.log('const start', this.globalConfig.deviceLang);


    platform
      .ready().then(() => {
        splashScreen.hide();


        // this.langService.find({}).subscribe((langs) => {
        //   this.globalConfig.langs = langs;
        //
        //   if (platform.is("android") || platform.is("ios")) {
        //     this.globalization.getPreferredLanguage().then(res => {
        //       if (res.value.includes("ua") || res.value.includes("UA") || res.value.includes("ru") || res.value.includes("RU")) {
        //         this.globalConfig.deviceLang = "ua";
        //         this.languageSwitcher = true;
        //       } else {
        //         this.globalConfig.deviceLang = "en";
        //       }
        //       this.init();
        //       this.geolocation.getCurrentPosition().then((position) => {
        //         this.globalConfig.globalPosition.latitude = position.coords.latitude;
        //         this.globalConfig.globalPosition.longitude = position.coords.longitude;
        //         this.init();
        //       }).catch(() => {
        //         this.globalConfig.globalPosition.latitude = 0;
        //         this.globalConfig.globalPosition.longitude = 0;
        //         this.init();
        //       });
        //       this.translate.use(this.globalConfig.deviceLang);
        //     });
        //   } else {
        //     this.globalConfig.deviceLang = "ua";
        //     this.languageSwitcher = true;
        //     this.translate.use(this.globalConfig.deviceLang);
        //     this.globalConfig.globalPosition.latitude = 0;
        //     this.globalConfig.globalPosition.longitude = 0;
        //     this.init();
        //   }
        // });
      }
    );

    // this.translate.setDefaultLang("en");
    // this.translate.use("ua");

  }

  ngOnInit(): void {

    this.doneSubject.subscribe((val) => {
      this.getLang = val === 'lang' ? true : this.getLang;
      this.getLocation = val === 'location' ? true : this.getLocation;
      console.log('get lang', this.getLang);
      console.log('get location', this.getLocation);
      if (this.getLang && this.getLocation) {
        this.init();
      }
    });

    this.langService.find({}).subscribe((langs) => {
      this.globalConfig.langs = langs;
      console.log('const if start', this.globalConfig.deviceLang);

      if (this.platform.is("android") || this.platform.is("ios")) {
        this.storage.get('lang').then((lang) => {
          if (lang) {
            this.globalConfig.deviceLang = lang;
            this.languageSwitcher = true;
            this.translate.use(this.globalConfig.deviceLang);
            this.doneSubject.next('lang');
          } else {
            this.getPrefferedLang();
          }
        }).catch(() => {
          this.getPrefferedLang()
        });
        this.geolocation.getCurrentPosition({timeout: 10000,}).then((position) => {
          this.globalConfig.globalPosition.latitude = position.coords.latitude;
          this.globalConfig.globalPosition.longitude = position.coords.longitude;
          this.doneSubject.next('location');
        }).catch(() => {
          this.globalConfig.globalPosition.latitude = 0;
          this.globalConfig.globalPosition.longitude = 0;
          this.doneSubject.next('location');
        })
      } else {
        this.storage.get('lang').then((lang) => {
          if (lang) {
            this.globalConfig.deviceLang = lang;
            this.languageSwitcher = true;
            this.translate.use(this.globalConfig.deviceLang);
            this.init();
          } else {
            this.globalConfig.deviceLang = "ua";
            this.languageSwitcher = true;
            this.translate.use(this.globalConfig.deviceLang);
            this.globalConfig.globalPosition.latitude = 0;
            this.globalConfig.globalPosition.longitude = 0;
            this.init();
          }
        }).catch(() => {
          this.globalConfig.deviceLang = "ua";
          this.languageSwitcher = true;
          this.translate.use(this.globalConfig.deviceLang);
          this.globalConfig.globalPosition.latitude = 0;
          this.globalConfig.globalPosition.longitude = 0;
          this.init();
        });
      }
    });
  }

  getPrefferedLang() {
    this.globalization.getPreferredLanguage().then(res => {
      if (res.value.includes("ua") || res.value.includes("UA") || res.value.includes("ru") || res.value.includes("RU")) {
        this.globalConfig.deviceLang = "ua";
        this.languageSwitcher = true;
      } else {
        this.globalConfig.deviceLang = "en";
      }
      this.translate.use(this.globalConfig.deviceLang);
      this.doneSubject.next('lang');
    }).catch(() => {
      this.globalConfig.deviceLang = "ua";
      this.languageSwitcher = true;
      this.translate.use(this.globalConfig.deviceLang);
      this.doneSubject.next('lang');
    })
  }

  init() {
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
      this.rootPage = HomePage;
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
    if (this.principal.facebookId) {
      this.fb.logout().then(value => {
        this.logoutServer();
      }).catch(reason => {
        this.logoutServer();
      });
    } else if (this.principal.googleId) {
      this.google.logout().then(value => {
        this.logoutServer();
      }).catch(reason => {
        this.logoutServer();
      });
    } else {
      this.logoutServer();
    }
  }

  logoutServer() {
    this.auth.logOut().subscribe(() => {
      this.principal = null;
      this.menuController.close();
      this.navCtrl.goToRoot({});
    }, (error) => {
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
    // this.globalConfig.deviceLang = this.languageSwitcher ? "ua" : "en";
    // this.translate.use(this.globalConfig.deviceLang);
    let selectedLang = this.globalConfig.deviceLang === 'ua' ? "en" : "ua";
    this.storage.set('lang', selectedLang);
    //todo serj add translate
    this.toastLang.create({
      dismissOnPageChange: true,
      message: "Please reload app!",
      duration: 3000,
      position: 'top'
    }).present();
  }
}


