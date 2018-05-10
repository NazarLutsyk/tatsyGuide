import {Component, NgZone, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {PlaceTypeProvider} from "../providers/place-type/place-type";
import {PlacesProvider} from "../providers/places-service/PlacesProvider";
import {LoginPage} from "../pages/login/login";
import {GlobalConfigsService} from "../configs/GlobalConfigsService";
import {HttpClient} from "@angular/common/http";
import {host2} from "../configs/GlobalVariables";
import {Client} from "../models/client/Client";


@Component({
  templateUrl: 'app.html',
  providers: []

})
export class MyApp {

  @ViewChild('myNav') navCtrl: NavController;
  rootPage: any = HomePage;
  placeTypes = [];
  searchObject = {range: {lower: 0, upper: 10000}, direction: false, filterFeature: {}};
  isAuthenticated: boolean = false;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private placeTypeService: PlaceTypeProvider,
              private placeService: PlacesProvider,
              private events: Events,
              private menuController: MenuController,
              private globalConfig: GlobalConfigsService,
              private http: HttpClient,
              private _ngZone: NgZone
  ) {


    platform
      .ready().then(
      () => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      }
    );

    this.events.subscribe("changeAuthState", value => {
      console.log('i will change value to - ', value);
      this._ngZone.run(() => {
        this.isAuthenticated = true;
      })
    })

  }


  ngOnInit() {
    this.placeTypeService
      .getPlaceTypes({}, [{placeTypeMultilang: {query: {lang: "5acf2559ab842f11f8362409"}}}])
      .subscribe(placeTypes => {
        for (const placeType of placeTypes) {
          this.placeTypes.push(placeType.multilang);
        }
      });

  }

  show(so) {
    //subscriber is in home.ts
    this.events.publish('functionCall:find', so);
  }

  goToFavorite() {
    this.events.publish("favoritePlaces");
  }

  goToLoginRegistration() {
    this.navCtrl.push(LoginPage);
    this.menuController.close();
  }


  logout() {
    console.log('logout', `${host2}/auth/logout`);
    this._ngZone.run(() => {
      this.isAuthenticated = false;
      console.log('in logout function', this.isAuthenticated)
    });
    this.http.get(`${host2}/auth/logout`).subscribe(value => {
      console.log("logout was done");
    });
  }

  checkDoINeedShowLogout() {
    this.http.get<Client>(`${host2}/auth/principal`).subscribe(value => {
      this._ngZone.run(() => {
        if (!value._id) { // not logined
          this.changeIsAuthValue();
        }
      })

    });

  }


  changeIsAuthValue() {
    this.isAuthenticated = !this.isAuthenticated;
  }

}




