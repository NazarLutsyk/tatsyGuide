import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Rating} from "../../models/rating/Rating";
import {RatingProvider} from "../../providers/rating/rating-provider";

/**
 * Generated class for the ModalTestimonialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-testimonial',
  templateUrl: 'modal-testimonial.html',
})
export class ModalTestimonialPage {


  text: string;
  stars: number = 5;
  sum: number = 0;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              private ratingService: RatingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTestimonialPage');
  }

  dismiss() {
    this.viewController.dismiss();

  }

  logForm() {
    let rating = new Rating(null, this.stars, this.text, this.sum, null, this.navParams.data._id);
    this.ratingService.create(rating).subscribe();
    this.dismiss();
  }


}
