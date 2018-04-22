import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {MapPage} from "../map/map";
import {Place} from "../../models/place/Place";
import {host1, host2} from "../../configs/GlobalVariables";
import {EventPage} from "../event/event";
import {NewsPage} from "../news/news";
import {BonusePage} from "../bonuse/bonuse";
import {PlaceInfoPage} from "../place-info/place-info";

// import {PlaceWithMultilang} from "../../models/place/PlaceWithMultilang";


@Component({
  selector: 'page-place-deatils',
  templateUrl: 'place-deatils.html',
  styles: ['place-details.scss']
})
export class PlaceDeatilsPage {
  place: Place;
  map: GoogleMap;
  globalHost: string;
  placeInfoPage = PlaceInfoPage;
  bonusesPage = BonusePage;
  eventsPage = EventPage;
  newsPage = NewsPage;
  mapPage = MapPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    this.place = this.navParams.data;
    console.log(this.place);

    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }


  }


}


