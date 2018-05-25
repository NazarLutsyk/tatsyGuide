import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";

@IonicPage()
@Component({
  selector: 'page-purgatory-places',
  templateUrl: 'purgatory-places.html',
})
export class PurgatoryPlacesPage {

  globalHost;
  places: Place[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private placeService: PlacesProvider
  ) {
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();
    this.loadPlaces()
      .subscribe(places => this.places = places);
  }

  doRefresh(refresher: Refresher) {
    this.loadPlaces()
      .subscribe(places => {
        this.places = places;
        refresher.complete();
      });
  }

  loadPlaces() {
    return this.placeService
      .find({
        query: {allowed: false},
        sort: {createdAt: -1},
        populate: [
          {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
          {
            path: 'types',
            populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
          },
        ]
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
        this.navCtrl.push(PlaceDeatilsPage, foundedPlace);
      });
  }

  allowPlace(place, $event) {
    $event.stopPropagation();
    this.placeService.update(place._id, {allowed: true}).subscribe(
      place => this.places.splice(this.places.indexOf(place), 1)
    );
  }

  disallowPlace(place, $event) {
    $event.stopPropagation();
    this.placeService.remove(place._id).subscribe(() => {
      this.places.splice(this.places.indexOf(place), 1);
    });
  }
}
