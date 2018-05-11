import {Component} from '@angular/core';
import {MenuController, NavController, NavParams, Platform} from 'ionic-angular';

import {GoogleMap} from '@ionic-native/google-maps';
import {MapPage} from "../map/map";
import {Place} from "../../models/place/Place";
import {EventPage} from "../event/event";
import {NewsPage} from "../news/news";
import {BonusePage} from "../bonuse/bonuse";
import {PlaceInfoPage} from "../place-info/place-info";
import {TestimonialPage} from "../testimonial/testimonial";
import {Storage} from "@ionic/storage";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@Component({
  selector: 'page-place-deatils',
  templateUrl: 'place-deatils.html',
  styles: ['place-details.scss']
})
export class PlaceDeatilsPage {
  isFavorite: boolean = false;
  place: Place;
  map: GoogleMap;
  globalHost: string;
  placeInfoPage = PlaceInfoPage;
  bonusesPage = BonusePage;
  eventsPage = EventPage;
  newsPage = NewsPage;
  mapPage = MapPage;
  testimonialsPage = TestimonialPage;




  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              platform: Platform,
              private menuController: MenuController,
              private storage: Storage,
  ) {
    this.place = this.navParams.data;

    let menus = this.menuController.getMenus();
    for (const menu of menus) {
      menu.swipeEnable(false);
    }

  }

  addToFavorite(place: Place) {
    if (this.isFavorite) {
      this.storage.remove(place.id);
    } else {
      this.storage.set(this.place.id, JSON.stringify(place));
    }
    this.isFavorite = !this.isFavorite;
  }



}


