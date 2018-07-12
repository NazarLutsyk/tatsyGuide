import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {TranslateService} from "@ngx-translate/core";

declare var window: any;
declare var position: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',

})
export class MapPage {

  map: any;
  currentPlace: Place;

  constructor(
    public navParams: NavParams,
    private placeService: PlacesProvider,
    private translate : TranslateService
    ) {
    this.currentPlace = this.navParams.data;
    console.log(this.currentPlace.location.lat, this.currentPlace.location.lng);
    this.map = {

      lat: this.currentPlace.location.lat,
      lng: this.currentPlace.location.lng,
      zoom: 13,
      markerLabel: this.currentPlace.location
    };
  }

  async goToPlace(){
    let position = await this.placeService.promisefyMyPosition();
    let myPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    window.location = `geo:0,0?q=${this.currentPlace.location.lat},${this.currentPlace.location.lng}`;
    // window.open= `geo:${this.currentPlace.location.lat},${this.currentPlace.location.lng}`;
  }

}
