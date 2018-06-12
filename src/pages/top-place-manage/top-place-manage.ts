import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopPlaceUpdatePage} from "../top-place-update/top-place-update";
import {NgForm} from "@angular/forms";


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
    return this.topPlaceService.find({
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
