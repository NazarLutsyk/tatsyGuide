import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Rating} from "../../models/rating/Rating";
import {RatingProvider} from "../../providers/rating/rating-provider";
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";

@IonicPage()
@Component({
  selector: 'page-update-rating',
  templateUrl: 'update-rating.html',
})
export class UpdateRatingPage {

  rating: Rating;
  ratingId: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ratingService: RatingProvider
  ) {
  }

  ngOnInit() {
    this.rating = this.navParams.data.rating;
    this.ratingId = (<any>this.rating)._id;
  }

  updateRating(updateForm: NgForm) {
    this.rating = updateForm.form.value.rating;
    this.ratingService.update(this.ratingId, this.rating)
      .subscribe((rating) => this.navCtrl.pop());
  }
}
