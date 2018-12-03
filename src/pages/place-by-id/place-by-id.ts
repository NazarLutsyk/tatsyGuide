import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";

@IonicPage()
@Component({
  selector: 'page-place-by-id',
  templateUrl: 'place-by-id.html',
})
export class PlaceByIdPage {

  @ViewChild('searchBar') searchBar;

  searchStr = '';
  placesRes = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placesService: PlacesProvider,
    public globalVars: GlobalConfigsService
  ) {
  }

  ngOnInit() {
    this.placesRes = [];
    this.searchStr = '';
  }

  onSearchPlace(refresher ?: Refresher) {
    let searchStrInput = this.searchBar.value || '';
    this.searchStr = searchStrInput.trim();
    this.findPlace().subscribe((res) => {
      if (Array.isArray(res)) {
        this.placesRes = [];
        let place = res[0];
        let placeM = place && place.multilang ? place.multilang : [];
        for (const singlePlaceM of placeM) {
          let resultPlace: any = {};
          resultPlace._id = place._id;
          resultPlace.avatar = place.avatar;
          resultPlace.distance = place.distance;
          resultPlace.rating = place.rating;
          resultPlace.multilang = singlePlaceM;
          resultPlace.city = place.city.find(value => value.lang == singlePlaceM.lang);
          resultPlace.types = place.types.filter(value => value.lang == singlePlaceM.lang);
          this.placesRes.push(resultPlace);
        }
      } else {
        this.placesRes = [];
      }

      if (refresher) {
        refresher.complete();
      }
    })
  }

  private findPlace() {
    if (this.searchStr) {
      let query: any = {};
      query._id = this.searchStr;
      return this.placesService.find({
        aggregate: [
          {$match: query},
          {
            $lookup: {
              from: 'multilangs',
              localField: '_id',
              foreignField: 'place',
              as: 'multilang',
            }
          },
          {
            $lookup: {
              from: 'multilangs',
              localField: 'types',
              foreignField: 'placeType',
              as: 'types',
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
          {
            $group: {
              _id: '$_id',
              types: {$first: '$types'},
              multilang: {$first: '$multilang'},
              rating: {$first: '$rating'},
              avatar: {$first: '$avatar'},
              city: {$first: '$city'},
              location: {$first: '$location'},
            }
          }
        ]
      });
    } else {
      return new Observable((subscriber) => subscriber.next(null))
    }
  }

  toDetails(id, lang) {
    this.navCtrl.push(PlaceDeatilsPage, {id, preferredLanguage: lang});
  }

  doRefresh(refresher: Refresher) {
    this.onSearchPlace(refresher);
  }
}
