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
import {host2, lang} from "../configs/GlobalVariables";
import {Client} from "../models/client/Client";
import {AuthProvider} from "../providers/auth/auth";


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
              private _ngZone: NgZone,
              private auth: AuthProvider
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
      .getPlaceTypes({}, [{placeTypeMultilang: {query: {lang: lang}}}])
      .subscribe(placeTypes => {
        for (const placeType of placeTypes) {
          console.log(placeType);
          this.placeTypes.push(placeType.multilang[0].name);
        }
      });

  }

  show(so) {
    //subscriber is in home.ts
    this.events.publish('functionCall:find', so);
  }


  goToLoginRegistration() {
    this.navCtrl.push(LoginPage);
    this.menuController.close();
  }


  logout() {
      this.auth.logOut().subscribe(value => {
      console.log("logout was done");
      this._ngZone.run(() => {
        this.isAuthenticated = false;
        console.log('in logout function', this.isAuthenticated)
      });
    });


  }

  // checkDoINeedShowLogout() {
  //   this.http.get<Client>(`${host2}/auth/principal`).subscribe(value => {
  //     this._ngZone.run(() => {
  //       if (!value._id) { // not logined
  //         this.changeIsAuthValue();
  //       }
  //     })
  //
  //   });
  //
  // }


  // changeIsAuthValue() {
  //   this.isAuthenticated = !this.isAuthenticated;
  // }

}




