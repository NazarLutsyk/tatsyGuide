import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {AuthProvider} from "../../providers/auth/auth";
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {HttpClient} from "@angular/common/http";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-my-favorite-places',
  templateUrl: 'my-favorite-places.html',
})
export class MyFavoritePlacesPage {


  places: Place[];
  globalHost: string;
  principal: Client;

  constructor(
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    public navCtrl: NavController,
    private navParams: NavParams,
    private placesService: PlacesProvider,
    private clientService: ClientProvider,
    private bonuseService: BonuseProvider,
    private events: Events,
    private auth: AuthProvider,
    platform: Platform,
  ) {
    this.globalHost = globalVars.getGlobalHost();
  }

  ngOnInit() {
    // this.auth.principal.subscribe(principal => {
    //   this.onLoad({query: {_id: this.principal.favoritePlaces}}).subscribe(places => this.places = places);
    // });
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.onLoad({query: {_id: this.principal.favoritePlaces}}).subscribe(places => this.places = places);
    });
  }

  toDetails(place) {
    this.placesService.findOne(place.id).subscribe((foundedPlace) => {
      this.navCtrl.push(PlaceDeatilsPage, foundedPlace);
    });
  }


  onLoad(target: Object = {}) {
    return new Observable<Place[]>((subscriber) => {
      this.placesService.getAllPlaces(target).subscribe((places) => {
        subscriber.next(places);
        subscriber.complete();
      }, (error) => {
        console.log(error);
        subscriber.error(error);
      });
    });
  }

  removeFavoritePlace(place, event) {
    event.stopPropagation();
    this.auth.loadPrincipal().subscribe((principal) => {
      this.places.splice(this.places.indexOf(place), 1);
      this.clientService.update((<any>principal)._id, {favoritePlaces: this.places}).subscribe();
    });

  }
}
