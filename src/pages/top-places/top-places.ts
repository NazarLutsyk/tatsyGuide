import {Component} from '@angular/core';
import {App, Events, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Observable} from "rxjs/Observable";
import {Place} from "../../models/place/Place";

@IonicPage()
@Component({
  selector: 'page-top-places',
  templateUrl: 'top-places.html',
})
export class TopPlacesPage {

  globalHost;
  topPlaces: Place[] = [];

  eventData = {
    city: ''
  };

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  placeQuery: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private placeService: PlacesProvider,
    private globalVars: GlobalConfigsService,
    private app: App,
    private events: Events
  ) {
    this.globalHost = globalVars.getGlobalHost();
  }

  ngOnInit() {
    this.eventData.city = this.globalVars.globalCity;
    this.events.subscribe('functionCall:findTops', (eventData) => {
      this.skip = 0;
      this.allLoaded = false;
      this.eventData = eventData;
      this.loadTopPlaces(true, eventData).subscribe(topPlaces => this.topPlaces = topPlaces);
    });
    this.loadTopPlaces(true, this.eventData)
      .subscribe(places => this.topPlaces = places);
  }

  prepareQuery(dataQuery = {city: ''}) {
    this.placeQuery = {
      query: {},
    };
    if (dataQuery.city) {
      this.placeQuery.query['city'] = dataQuery.city;
    }
  }


  loadTopPlaces(clearCache = false, dataQuery = {city: ''}) {
    this.prepareQuery(dataQuery);
    return new Observable<Place[]>((subscriber) => {
        let alreadyLoadedPlaces = this.topPlaces.map(value => (<any>value)._id);
        this.placeService.find({
          aggregate: [
            {
              $match: {
                _id: {$nin: clearCache ? [] : alreadyLoadedPlaces},
                ...this.placeQuery.query
              }
            },
            {
              $lookup: {
                from: 'topplaces',
                localField: '_id',
                foreignField: 'place',
                as: 'tops',
              }
            },
            {$unwind: "$tops"},
            {
              $match: {
                'tops.actual': true
              }
            },
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
                'types.lang': this.globalVars.getGlobalLang(),
                'multilang.lang': this.globalVars.getGlobalLang(),
              }
            },
            {
              $lookup: {
                from: 'multilangs',
                localField: 'city',
                foreignField: 'city',
                as: 'city',
              }
            },
            {$unwind: "$city"},
            {
              $match: {
                'city.lang': this.globalVars.getGlobalLang(),
                'multilang.lang': this.globalVars.getGlobalLang(),
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
                createdAt: {$first: '$createdAt'},
                city: {$first: '$city'},
              }
            },
            {$sample: {size: this.limit}},
          ]
        }).subscribe((places) => {
          subscriber.next(places);
        })
      }
    );
  }

  doRefresh(refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadTopPlaces(true, this.eventData)
      .subscribe(places => {
        this.topPlaces = places;
        refresher.complete();
      });
  }

  toDetails(place) {
    this.app.getRootNav().push(PlaceDeatilsPage, {id: place._id});
  }


  loadNextTopPlacesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadTopPlaces(false, this.eventData)
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
