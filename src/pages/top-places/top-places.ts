import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {switchMap} from "rxjs/operators";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";

@IonicPage()
@Component({
  selector: 'page-top-places',
  templateUrl: 'top-places.html',
})
export class TopPlacesPage {

  globalHost;
  topPlaces = [];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private placeService: PlacesProvider,
    private globalVars: GlobalConfigsService,
    private app: App,
    private loadingCtrl: LoadingController
  ) {
    this.globalHost = globalVars.getGlobalHost();
  }

  ngOnInit() {
    this.loadTopPlaces()
      .subscribe(places => this.topPlaces = places);
  }

  loadTopPlaces() {
    return this.topPlaceService.find({
      query: {actual: true},
      select: 'place'
    }).pipe(
      switchMap(topPlaces => {
        let placesIds = topPlaces.map(topPlace => topPlace.place);
        return this.placeService.find({
          query: {_id: placesIds},
          populate: [
            {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
            },
          ],
          skip: this.skip,
          limit: this.limit
        });
      })
    )
  }

  doRefresh(refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadTopPlaces()
      .subscribe(places => {
        this.topPlaces = places;
        refresher.complete();
      });
  }

  toDetails(place) {
    let spinner = this.loadingCtrl.create({
      dismissOnPageChange: true,
      enableBackdropDismiss: true
    });
    spinner.present();
    let placesSubscriber = this.placeService
      .findOne(
        place._id,
        {
          populate: [
            {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
            },
          ]
        }
      )
      .subscribe((foundedPlace) => {
        this.app.getRootNav().push(PlaceDeatilsPage, foundedPlace);
      });
    spinner.onWillDismiss(() => {
      placesSubscriber.unsubscribe();
    });
  }


  loadNextTopPlacesPage(event: InfiniteScroll) {
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
