import {Component} from '@angular/core';
import {Events, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {PlaceTypeProvider} from "../providers/place-type/place-type";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlacesProvider} from "../providers/places-service/PlacesProvider";


@Component({
  templateUrl: 'app.html',
  providers: []

})
export class MyApp {
  rootPage: any = HomePage;
  placeTypes = [];
  searchObject = {range: {lower: 0, upper: 600}, direction: false, filterFeature: {}};

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private placeTypeService: PlaceTypeProvider,
              private formBuilder: FormBuilder,
              private placeService: PlacesProvider,
              private events: Events
  ) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

  }


  ngOnInit() {
    this.placeTypeService
      .getPlaceTypes({}, [{placeTypeMultilang: {query: {lang: "5acf2559ab842f11f8362409"}}}])
      .subscribe(placeTypes => {
        for (const placeType of placeTypes) {
          this.placeTypes.push(placeType.multilang[0].name);
        }
      });

  }

  show(so) {
    this.events.publish('functionCall:find', so);


  }

}

