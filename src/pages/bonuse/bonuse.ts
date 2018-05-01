import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

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
