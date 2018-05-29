import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";

@IonicPage()
@Component({
  selector: 'page-top-places',
  templateUrl: 'top-places.html',
})
export class TopPlacesPage {

  globalHost;
  topPlaces = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private placeService: PlacesProvider,
    private globalVars: GlobalConfigsService
  ) {
    this.globalHost = globalVars.getGlobalHost();
  }

  // ngOnInit() {
  //   this.loadTopPlaces()
  //     .subscribe(places => this.topPlaces = places);
  // }
  //
  // loadTopPlaces() {
  //   return this.topPlaceService.find({
  //     query: {actual: true},
  //     select: 'place'
  //   }).pipe(
  //     switchMap((value, index) => {
  //
  //     })
  //   )
  // }
  //
  // doRefresh(refresher) {
  //   this.loadTopPlaces()
  //     .subscribe(places => {
  //       this.topPlaces = places;
  //       refresher.complete();
  //     });
  // }


}
