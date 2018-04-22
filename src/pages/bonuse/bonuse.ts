import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

/**
 * Generated class for the BonusePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bonuse',
  templateUrl: 'bonuse.html',
})
export class BonusePage {

  place: Place;

  constructor(public navCtrl: NavController, public navParams: NavParams, private   gc: GlobalConfigsService) {
    this.place = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BonusePage');
  }

}
