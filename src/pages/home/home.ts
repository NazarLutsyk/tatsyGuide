import {Component, NgZone, OnInit} from '@angular/core';
import {Events, NavController, NavParams, Platform, Refresher} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {Place} from "../../models/place/Place";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {zip} from 'rxjs/observable/zip';
import {Observable} from "rxjs/Observable";
import {ObjectUtils} from "../../utils/ObjectUtils";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

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
    private placeMultilangService: PlaceMultilangProvider,
    private storage: Storage,
    platform: Platform,
    private _ngZone: NgZone
  ) {

    this.globalHost = globalVars.getGlobalHost();

    this.events.subscribe('functionCall:find', eventData => {

      let filter: any = {};
      let sort: any = {};

      if (eventData.placeType) {
        filter.types = eventData.placeType;
      }
      for (const feature in eventData.filterFeature) {
        if (!eventData.filterFeature[feature]) delete eventData.filterFeature[feature];
        filter['features.' + feature] = eventData.filterFeature[feature];
      }
      if (!ObjectUtils.isEmpty(eventData.range)) {
        filter.averagePrice = {$gte: eventData.range.lower, $lte: eventData.range.upper};
      }
      if (eventData.sort === 'rating' || eventData.sort === 'averagePrice') {
        sort[eventData.sort] = eventData.direction ? 1 : -1
      }

      let target = {query: filter, sort: sort};

      this.onLoad(target).subscribe(places => {
        this.places = places;
        if (eventData.sort === 'location') {
          this.places = this.places.sort((a, b) => {
            if (eventData.direction > 0)
              return a.distance - b.distance;
            else {
              return b.distance - a.distance;
            }
          });
        }
        if (eventData.sort === 'name') {
          let placeIds = this.places.map(elem => (<any>elem)._id);
          let target = {
            query: {place: {$in: placeIds}, lang: this.globalVars.getGlobalLang()},
            sort: {[eventData.sort]: eventData.direction ? 1 : -1},
          };
          this.placeMultilangService.getPlaceMultilangs(target, {}).subscribe((multilangs) => {
            let multilangIds = multilangs.map(elem => elem.place);

            this.places = this.places.sort((a, b) => {
              return multilangIds.findIndex(id => (<any>a)._id === id) -
              multilangIds.findIndex(id => (<any>b)._id === id)
            });
          });
        }
      });
    });
  }

  ngOnInit() {
    this.auth.principal.subscribe(principal => this.principal = principal);
    this.auth.loadPrincipal().subscribe();
    this.onLoad().subscribe(places => this.places = places);
  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, place);
  }

  doRefresh(refresher: Refresher) {
    this.onLoad().subscribe((places) => {
      this.places = places;
      refresher.complete();
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

}
