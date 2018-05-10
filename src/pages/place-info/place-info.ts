import {Component} from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DrinkerApplicationPage} from "../drinker-application/drinker-application";

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
    private app: App,
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

  // x(): void {
  //   // alert("goToMapPage");
  //   this.navCtrl.push(MapPage, this.place);
  //   console.log("xxxx");
  // }

  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }


  goToCreateDrinkerApplication(place) {
    // TODO check this 2127 may 9

    this.app.getRootNavs().push(DrinkerApplicationPage, {place, disable: true});


  }

}
