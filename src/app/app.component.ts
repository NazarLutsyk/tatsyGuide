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


@Component({
  templateUrl: 'app.html',
  providers: []

})
export class MyApp implements OnInit {

  @ViewChild('myNav') navCtrl: NavController;
  rootPage: any = HomePage;
  placeTypes = [];
  searchObject = {range: {lower: 0, upper: 10000}, direction: false, filterFeature: {}};
  principal: Client = null;

  // isAuthenticated: boolean;

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
        statusBar.styleDefault();
        splashScreen.hide();
      }
    );
  }


  ngOnInit() {
    this.auth.principal.subscribe((principal) => {
      this.principal = principal;
    });

    zip(
      this.auth.loadPrincipal(),
      this.placeTypeService
        .getPlaceTypes({}, [{placeTypeMultilang: {query: {lang: this.globalConfig.getGlobalLang()}}}])
    ).subscribe(([principal, placeTypes]) => {
      for (const placeType of placeTypes) {
        this.placeTypes.push(placeType.multilang[0].name);
      }
    }, (err) => {
      console.log(err);
    })
  }

  show(so) {
    this.events.publish('functionCall:find', so);
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

}


