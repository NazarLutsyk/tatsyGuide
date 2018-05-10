import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RatingProvider} from "../../providers/rating/rating-provider";
import {Rating} from "../../models/rating/Rating";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";


@IonicPage()
@Component({
  selector: 'page-testimonial',
  templateUrl: 'testimonial.html',
})
export class TestimonialPage {

  ratings: Rating[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ratingProvider: RatingProvider,
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestimonialPage');
    this.ratingProvider.getRatingsOfCurrentPlace(this.navParams.data._id).subscribe(value => this.ratings = value);

  }

}
