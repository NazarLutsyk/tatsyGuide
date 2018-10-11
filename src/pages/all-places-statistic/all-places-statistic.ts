import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {LangProvider} from "../../providers/lang/lang";
import {DateTimePickerConfigProvider} from "../../providers/date-time-picker-config/date-time-picker-config";
import {Observable} from "rxjs";
import {ReviewProvider} from "../../providers/review/review";

@IonicPage()
@Component({
  selector: 'page-all-places-statistic',
  templateUrl: 'all-places-statistic.html',
})
export class AllPlacesStatisticPage {

  globalHost;
  places: any[] = [];
  selectedLang = '';
  langs = [];


  start;
  end;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placeService: PlacesProvider,
    private globalConfig: GlobalConfigsService,
    private placeMultilangService: PlaceMultilangProvider,
    private langsService: LangProvider,
    public datePickerConfig: DateTimePickerConfigProvider,
    private reviewService: ReviewProvider
  ) {
    this.globalHost = globalConfig.getGlobalHost();
  }

  ngOnInit() {
    this.selectedLang = this.globalConfig.getGlobalLang();
    this.langsService.find({}).subscribe(langs => this.langs = langs);
    this.loadStat().subscribe(places => this.places = places);
  }

  loadStat() {
    let matchStatisticQuery: any = {};
    if (this.start && this.end) {
      matchStatisticQuery = {
        start: this.start,
        end: this.end
      };
    }
    return new Observable<any[]>((subscriber) => {
      this.placeService.find({
        aggregate: [
          {
            $lookup: {
              from: 'multilangs',
              localField: '_id',
              foreignField: 'place',
              as: 'multilang',
            }
          },
          {$unwind: "$multilang"},
          {
            $match: {
              'multilang.lang': this.selectedLang,
            }
          },
          {
            $group: {
              _id: '$_id',
              multilang: {$addToSet: '$multilang'},
              avatar: {$first: '$avatar'}
            }
          },
          {$skip: this.skip},
          {$limit: this.limit},
        ]
      }).subscribe((places) => {
        let allPlaces = [...this.places, ...places];
        let placeIds = allPlaces
          .map(place => place._id)
          .filter((v, i, a) => a.indexOf(v) === i);
        this.reviewService.findMany({
          query: {
            places: placeIds,
            ...matchStatisticQuery
          }
        }).subscribe(({count}) => {
          for (const place of allPlaces) {
            let foundedCount = count.find(singleCount => singleCount._id === place._id);
            if (foundedCount) {
              place.statistic = foundedCount.count;
            } else {
              place.statistic = 0;
            }
          }
          subscriber.next(places);
        })
      })
    });
  }

  getStat(searchForm: NgForm) {
    this.loadStat().subscribe(places => this.places = places);
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
    this.navCtrl.push(PlaceDeatilsPage, {id: place._id, preferredLanguage: this.selectedLang});
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

  changeLang() {
    this.loadStat().subscribe(places => this.places = places);
  }
}
