import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {MapPage} from "../map/map";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

/**
 * Generated class for the PlaceInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-place-info',
  templateUrl: 'place-info.html',
})
export class PlaceInfoPage {
  globalHost: string;
  place: Place;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    gc: GlobalConfigsService,
    private events: Events
  ) {
    this.place = this.navParams.data;
    this.globalHost = gc.getGlobalHost();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceInfoPage');
  }

  x(): void {
    // alert("goToMapPage");
    this.navCtrl.push(MapPage, this.place);
    console.log("xxxx");
  }

  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }

}
