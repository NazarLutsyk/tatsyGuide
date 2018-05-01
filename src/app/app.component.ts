import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {PlaceTypeProvider} from "../providers/place-type/place-type";
import {PlacesProvider} from "../providers/places-service/PlacesProvider";
import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage";
import {GlobalConfigsService} from "../configs/GlobalConfigsService";
import {HttpClient} from "@angular/common/http";
import {host2} from "../configs/GlobalVariables";


@Component({
  templateUrl: 'app.html',
  providers: []

})
export class MyApp {

  @ViewChild('myNav') navCtrl: NavController;
  rootPage: any = HomePage;
  placeTypes = [];
  searchObject = {range: {lower: 0, upper: 10000}, direction: false, filterFeature: {}};

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private placeTypeService: PlaceTypeProvider,
              // private formBuilder: FormBuilder,
              private placeService: PlacesProvider,
              private events: Events,
              private menuController: MenuController,
              private storage: Storage,
              private globalConfig: GlobalConfigsService,
              private http: HttpClient
  ) {


    platform
      .ready()

      .then(
        () => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar
            .styleDefault();

          splashScreen
            .hide();

        }
      )
    ;


    console.log("my app load");
// this.storage.get("currentPrincipal").then(value => console.log(value));
    this.storage.get("currentPrincipal").then();


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
    this.events.publish('functionCall:find', so);
  }

  goToFavorite() {
    this.events.publish("favoritePlaces");
  }

  goToLoginRegistration() {
    this.navCtrl.push(LoginPage);
    this.menuController.close();
  }


  ionViewDidEnter(){
    console.log("enter");
    this.storage.get("currentPrincipal").then(value => console.log(value));
  }

  logout(){
    console.log('logout');
    this.http.get(`${host2}/auth/logout`);
  }

}




