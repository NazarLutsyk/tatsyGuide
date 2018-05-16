import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {NgForm} from "@angular/forms";


// public name: string = '', +
//   public description: string = '', +
//   public address: { city: string, street: string, number: string }, +

// public id: string = '', + default
//   public phone: string = '', +
//   public email: string = '', +
//   public averagePrice: number = 0, -!
//   public reviews: number = 0, -!
//   public rating: number = 0, -!
//   public allowed: boolean = false, -!
//   public avatar: string = '',  +?
//   public distance: number = 0, -!
//   public location: { +-
//   lat: number;
//   lng: number;
// } = {lat: 0, lng: 0},
//   public features: {
//   wifi: boolean; +
//   parking: boolean; +
//   vipRoom: boolean; +
//   karaoke: boolean +
// } = {wifi: false, parking: false, vipRoom: false, karaoke: false},
//   public topCategories: string[] = [], ???
//   public images: string[] = [],
//   public days: {
//   1: { start: string, end: string };
//   2: { start: string, end: string };
//   3: { start: string, end: string };
//   4: { start: string, end: string };
//   5: { start: string, end: string };
//   6: { start: string, end: string };
//   7: { start: string, end: string };
// },
// public promos: Bonuse[] = [], Later
//   public hashTags: HashTag[] = [],  Later
//   public tops: TopPlace[] = [], Later
//   public types: PlaceType[] = [], +
//   public multilang: PlaceMultilang = null,
//   public complaints: Complaint[] = [], -
//   public drinkApplications: DrinkApplication[] = [], -
//   public ratings: Rating[] = [], -
//   public departments: Department[] = [] -

@IonicPage()
@Component({
  selector: 'page-create-place',
  templateUrl: 'create-place.html',
})
export class CreatePlacePage {

  place : Place;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePlacePage');
  }


  createPlace(form: NgForm) {
    console.log(form);
  }
}
