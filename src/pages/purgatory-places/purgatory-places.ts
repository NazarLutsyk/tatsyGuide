import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Observable} from "rxjs/Observable";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-purgatory-places',
  templateUrl: 'purgatory-places.html',
})
export class PurgatoryPlacesPage {

  globalHost;
  places: Place[] = [];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private placesService: PlacesProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private translate: TranslateService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();
    this.loadPlaces()
      .subscribe(places => this.places = places);
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadPlaces()
      .subscribe(places => {
        this.places = places;
        refresher.complete();
      });
  }

  loadPlaces() {
    return new Observable<Place[]>((subscriber) => {
      this.placesService.find({
        query: {allowed: false},
        populate: [
          {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
          {
            path: 'types',
            populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
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
                  populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
                }
              ],
              $project: {
                multilang: {$arrayElemAt: ["$multilang", 0]},
                types: 1,
                rating: 1,
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
  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, {id: place._id});
  }

  allowPlace(place, $event) {
    $event.stopPropagation();
    this.placesService.update(place._id, {allowed: true}).subscribe(
      updatedPlace => this.places.splice(this.places.indexOf(place), 1)
    );
  }

  disallowPlace(place, $event) {
    $event.stopPropagation();
    this.placesService.remove(place._id).subscribe(() => {
      this.places.splice(this.places.indexOf(place), 1);
    });
  }

  loadNextPlacesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadPlaces()
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
