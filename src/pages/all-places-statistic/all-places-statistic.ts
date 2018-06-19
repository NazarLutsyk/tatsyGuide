import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Observable} from "rxjs/Observable";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";

@IonicPage()
@Component({
  selector: 'page-all-places-statistic',
  templateUrl: 'all-places-statistic.html',
})
export class AllPlacesStatisticPage {

  globalHost;
  places: any[] = [];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placeService: PlacesProvider,
    private globalConfig: GlobalConfigsService,
    private placeMultilangService: PlaceMultilangProvider
  ) {
    this.globalHost = globalConfig.getGlobalHost();
  }

  ngOnInit() {
    this.loadStat().subscribe(places => this.places = places);
  }

  loadStat(start = null, end = null) {
    let query: any = {};
    if (start && end) {
      query.createdAt = {
        $gte: start,
        $lte: end
      };
    }
    return new Observable<any[]>((subscriber) => {
      this.placeService.find({
        populate: [
          {
            path: 'multilang',
            match: {lang: this.globalConfig.getGlobalLang()}
          },
          {
            path: 'statistic',
            match: query
          }
        ],
        skip: this.skip,
        limit: this.limit
      }).subscribe((places) => {
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
          this.placeService.find({
            query: {_id: {$in: otherPlacesIds}},
            populate: [
              {path: 'multilang', options: {limit: 1}},
              {path: 'statistic', match: query}
            ],
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

  getStat(searchForm: NgForm) {
    this.loadStat(searchForm.form.value.start, searchForm.form.value.end).subscribe(places => this.places = places);
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadStat().subscribe(places => {
      this.places = places;
      refresher.complete();
    });
  }

  toDetails(place) {
    this.placeService
      .findOne(
        place._id,
        {
          populate: [
            {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
          ]
        }
      )
      .subscribe((foundedPlace) => {
        let place = foundedPlace;
        if (!place.multilang || place.multilang.length === 0) {
          this.placeMultilangService.find({
            query: {place: place._id},
            limit: 1
          }).subscribe((pm) => {
            place.multilang = pm;
            this.navCtrl.push(PlaceDeatilsPage, foundedPlace);
          })
        } else {
          this.navCtrl.push(PlaceDeatilsPage, foundedPlace);
        }
      });
  }

  loadNextStatisticPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadStat()
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
