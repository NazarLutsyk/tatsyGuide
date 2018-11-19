import {Component, ViewChild} from '@angular/core';
import {App, InfiniteScroll, IonicPage, NavController, NavParams, Refresher, Searchbar} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";

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
    private globalConfig: GlobalConfigsService,
    private app: App
  ) {
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();
    if (this.navParams.data.hashTag) {
      this.searchHashTag = this.navParams.data.hashTag;
    }
    this.findPlaces().subscribe(places => this.places = places);
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.findPlaces().subscribe(places => {
      this.places = places;
      refresher.complete();
    });
  }

  onSearchPlaces($event = {}) {
    this.skip = 0;
    this.allLoaded = false;
    setTimeout(() => {
      this.findPlaces().subscribe(places => this.places = places);
    }, 500);
  }

  findPlaces() {
    let hashTagsInput = this.searchHashTag
      .trim()
      .replace(' ', '')
      .split(',')
      .filter(value => value.length > 0 && value[0] === '#')
      .map(value => value.replace('#', ''));

    return this.placesService.find({
      aggregate: [
        {$match: {hashTags: {$in: hashTagsInput}}},
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
          $lookup: {
            from: 'multilangs',
            localField: 'types',
            foreignField: 'placeType',
            as: 'types',
          }
        },
        {$unwind: "$types"},
        {
          $match: {
            'types.lang': this.globalConfig.getGlobalLang(),
            'multilang.lang': this.globalConfig.getGlobalLang()
          }
        },
        {
          $group: {
            _id: '$_id',
            types: {$push: '$types'},
            multilang: {$addToSet: '$multilang'},
            phones: {$push: '$phones'},
            emails: {$push: '$emails'},
            averagePrice: {$first: '$averagePrice'},
            reviews: {$first: '$reviews'},
            rating: {$first: '$rating'},
            allowed: {$first: '$allowed'},
            avatar: {$first: '$avatar'},
            location: {$first: '$location'},
            features: {$first: '$features'},
            topCategories: {$first: '$topCategories'},
            images: {$first: '$images'},
            days: {$first: '$days'},
            hashTags: {$first: '$hashTags'},
          }
        },
        {$skip: this.skip},
        {$limit: this.limit}
      ]
    });
  }

  loadNextPlacesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.findPlaces()
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

  toDetails(id) {
    this.app.getRootNav().push(PlaceDeatilsPage, {id});
  }
}
