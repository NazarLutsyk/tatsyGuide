import {Component, ViewChild} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher, Searchbar} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-hash-tags',
  templateUrl: 'hash-tags.html',
})
export class HashTagsPage {

  @ViewChild('searchbar') searchbar: Searchbar;
  globalHost: string;
  places: Place[];
  searchHashTag: string = '';

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placesService: PlacesProvider,
    private globalConfig: GlobalConfigsService
  ) {
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();
    if (this.navParams.data.hashTag) {
      this.searchHashTag = this.navParams.data.hashTag;
    }
    this.onSearchPlaces().subscribe(places => this.places = places);
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.onSearchPlaces().subscribe(places => {
      this.places = places;
      refresher.complete();
    });
  }

  onSearchPlaces($event = {}) {
    let hashTags = this.searchHashTag.split(',');
    return this.placesService
      .find(
        {
          query: {hashTags: {$in: hashTags}},
          populate: [
            {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
          ],
          skip: this.skip,
          limit: this.limit
        }
      );
  }

  loadNextPlacesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.onSearchPlaces()
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
