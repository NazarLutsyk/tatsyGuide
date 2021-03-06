import {Component} from '@angular/core';
import {Events, InfiniteScroll, IonicPage, LoadingController, NavController, NavParams, Refresher} from 'ionic-angular';
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
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-my-favorite-places',
  templateUrl: 'my-favorite-places.html',
})
export class MyFavoritePlacesPage {


  places: Place[] = [];
  globalHost: string;
  principal: Client;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    public navCtrl: NavController,
    private navParams: NavParams,
    private placesService: PlacesProvider,
    private clientService: ClientProvider,
    private bonuseService: BonuseProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private events: Events,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private globalConfig: GlobalConfigsService
  ) {
    this.globalHost = globalVars.getGlobalHost();
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.loadOwnFavoritePlaces().subscribe(places => {
      this.places = places;
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadOwnFavoritePlaces().subscribe(places => {
      this.places = places;
      refresher.complete();
    });
  }

  loadOwnFavoritePlaces() {
    return new Observable<Place[]>((subscriber) => {
      this.auth.loadPrincipal().subscribe((principal) => {
        this.principal = principal;
        this.placesService
          .find({
            query: {_id: this.principal.favoritePlaces},
            populate: [
              {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
              {
                path: 'types',
                populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
              },
              {
                path: 'city',
                populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
              }
            ],
            skip: this.skip,
            limit: this.limit
          })
          .subscribe(places => {
            let okPlaces = [];
            let otherPlacesIds = [];
            for (const place of places) {
              if (!place.multilang || place.multilang.length === 0) {
                otherPlacesIds.push(place._id);
              } else {
                okPlaces.push(place);
              }
            }
            if (otherPlacesIds.length > 0) {
              this.placesService.find({
                query: {_id: {$in: otherPlacesIds}},
                populate: [
                  {path: 'multilang'},
                  {
                    path: 'types',
                    populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
                  },
                  {
                    path: 'city',
                    populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
                  }
                ],
                $project: {
                  multilang: {$arrayElemAt: ["$multilang", 0]},
                  types: 1,
                  rating: 1,
                  city: 1,
                },
                skip: this.skip,
                limit: this.limit
              }).subscribe((places) => {
                okPlaces.push(...places);
                subscriber.next(okPlaces);
              });
            } else {
              subscriber.next(okPlaces);
            }
          });
      });

    })
  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, {id: place._id});
  }


  removeFavoritePlace(place, event) {
    event.stopPropagation();
    this.auth.loadPrincipal().subscribe((principal) => {
      this.places.splice(this.places.indexOf(place), 1);
      this.clientService.update((<any>principal)._id, {favoritePlaces: this.places}).subscribe();
    });
  }

  loadNextPlacesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadOwnFavoritePlaces()
        .subscribe((places) => {
          if (places.length < this.pageSize) this.allLoaded = true;
          this.places.push(...places);
          event.complete();
        })
    }

  }

  setNextPage() {
    this.skip += this.pageSize;
  }
}
