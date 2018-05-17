import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";

/**
 * Generated class for the ChooseLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var window: any;
declare var position: any;


@IonicPage()
@Component({
  selector: 'page-choose-location',
  templateUrl: 'choose-location.html',
})
export class ChooseLocationPage {

  @ViewChild("myMap") myMap: any;


  map: any;
  marker: any;

  constructor(
    private event: Events,
    public navParams: NavParams, private placeService: PlacesProvider,
    private navCtrl: NavController) {

    this.placeService.promisefyMyPosition().then(position => {
      this.map = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 13,
      };
      this.marker = {position: {lat: position.coords.latitude, lng: position.coords.longitude}};


    });

  }

  addMarker(data) {
    this.marker = {position: {lat: data.coords.lat, lng: data.coords.lng}};
    this.event.publish("choosePosition", data.coords);
    this.navCtrl.pop();
  }


}
