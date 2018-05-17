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
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions';
import {AuthProvider} from "../../providers/auth/auth";
import {Client} from "../../models/client/Client";
import {ClientProvider} from "../../providers/client/ClientProvider";


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
  principal: Client;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              platform: Platform,
              private menuController: MenuController,
              private storage: Storage,
              private auth: AuthProvider,
              private clientService: ClientProvider
  ) {
  }

  ngOnInit(){
    this.place = this.navParams.data;

    let menus = this.menuController.getMenus();
    for (const menu of menus) {
      menu.swipeEnable(false);
    }
    this.auth.loadPrincipal().subscribe((principal) => {
      if (principal) {
        this.principal = principal;
        let favouriteIndex = (<any>this.principal.favoritePlaces).indexOf(this.place.id);
        if (favouriteIndex >= 0) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      } else {
        this.isFavorite = false
      }
    });
  }

  addToFavorite(place: Place) {
    let favouriteIndex = this.principal.favoritePlaces.indexOf((<any>this.place)._id);
    if (favouriteIndex >= 0) {
      this.principal.favoritePlaces.splice(favouriteIndex, 1);
    } else {
      this.principal.favoritePlaces.push(this.place);
    }
    this.clientService
      .update((<any>this.principal)._id, {favoritePlaces: this.principal.favoritePlaces})
      .subscribe();
    this.isFavorite = !this.isFavorite;
  }


}


