import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {TopPlace} from "../../models/tops/TopPlace";
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {TopPlaceUpdatePage} from "../top-place-update/top-place-update";


@IonicPage()
@Component({
  selector: 'page-top-place-manage',
  templateUrl: 'top-place-manage.html',
})
export class TopPlaceManagePage {

  topPlaces: any[] = [];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private globalVars: GlobalConfigsService
  ) {
  }

  ngOnInit() {
    this.loadTopPlaces()
      .subscribe(topPlaces => this.topPlaces = topPlaces);
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadTopPlaces()
      .subscribe(topPlaces => {
        this.topPlaces = topPlaces;
        refresher.complete();
      });
  }

  loadTopPlaces() {
    return new Observable<TopPlace[]>((subscriber) => {
      this.topPlaceService.find({
        populate: [
          {
            path: 'place',
            populate: [
              {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
            ]

          }
        ],
        skip: this.skip,
        limit: this.limit
      }).subscribe((topPlaces) => {


        let okTopPlaces = [];
        let otherTopPlacesIds = [];
        for (const topPlace of topPlaces) {
          if (!topPlace.place.multilang || topPlace.place.multilang.length === 0) {
            otherTopPlacesIds.push(topPlace._id);
          } else {
            okTopPlaces.push(topPlace);
          }
        }
        if (otherTopPlacesIds.length > 0) {
          this.topPlaceService.find({
            query: {_id: {$in: otherTopPlacesIds}},
            populate: [
              {
                path: 'place',
                populate: [
                  {path: 'multilang', options: {limit: 1}},
                ]
              }
            ],
            skip: this.skip,
            limit: this.limit
          }).subscribe((topPlaces) => {
            okTopPlaces.push(...topPlaces);
            subscriber.next(okTopPlaces);
          });
        } else {
          subscriber.next(okTopPlaces);
        }


      })
    });
  }


  updateTopPlace(topPlace) {
    this.navCtrl.push(TopPlaceUpdatePage, topPlace);
  }

  removeTopPlace(topPlace) {
    this.topPlaceService.remove(topPlace._id).subscribe(() => {
      this.loadTopPlaces().subscribe(topPlaces => this.topPlaces = topPlaces);
    });
  }

  loadNextTopPlacesAppPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadTopPlaces()
        .subscribe((topPlaces) => {
          if (topPlaces.length < this.pageSize) this.allLoaded = true;
          this.topPlaces.push(...topPlaces);
          event.complete();
        })
    }

  }

  setNextPage() {
    this.skip += this.pageSize;
  }
}
