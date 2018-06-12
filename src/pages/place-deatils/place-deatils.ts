import {Component} from '@angular/core';
import {MenuController, NavController, NavParams, Platform} from 'ionic-angular';

import {GoogleMap} from '@ionic-native/google-maps';
import {Place} from "../../models/place/Place";
import {PlaceInfoPage} from "../place-info/place-info";
import {AuthProvider} from "../../providers/auth/auth";
// import {Client} from "../../models/client/Client";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {BonusePage} from "../bonuse/bonuse";
import {NewsPage} from "../news/news";
import {EventPage} from "../event/event";
import {MapPage} from "../map/map";
import {TestimonialPage} from "../testimonial/testimonial";
import {PlaceAppliactionsPage} from "../place-appliactions/place-appliactions";
import {PlaceStatisticPage} from "../place-statistic/place-statistic";


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
  drinkerPage = PlaceAppliactionsPage;
  placeStatisticPage = PlaceStatisticPage;
  principal;
  departments;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              platform: Platform,
              private menuController: MenuController,
              // private storage: Storage,
              private auth: AuthProvider,
              private clientService: ClientProvider,
              private departmentService: DepartmentProvider
  ) {
  }

  ngOnInit() {
    console.log("place details page ngOnInit ");

    this.place = this.navParams.data;
    let menus = this.menuController.getMenus();
    for (const menu of menus) {
      menu.swipeEnable(false);
    }
    this.auth.loadPrincipal().subscribe((principal) => {
      console.log("place details page ngOnInit loadPrincipal subscribe start");

      if (principal) {
        this.principal = principal;

        this.departmentService.find({
          query: {place: (<any>this.place)._id, client: this.principal._id},
        }).subscribe((departments) => {
          this.departments = departments;
        });
        console.log("place details page ngOnInit loadPrincipal subscribe middle");

        let favouriteIndex = (<any>this.principal.favoritePlaces).indexOf(this.place.id);
        if (favouriteIndex >= 0) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      } else {
        this.isFavorite = false
      }
      console.log("place details page ngOnInit loadPrincipal subscribe end");
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


