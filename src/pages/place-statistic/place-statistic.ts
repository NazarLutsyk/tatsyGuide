import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReviewProvider} from "../../providers/review/review";
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-place-statistic',
  templateUrl: 'place-statistic.html',
})
export class PlaceStatisticPage {

  reviews = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reviewService: ReviewProvider
  ) {
  }

  ngOnInit() {
    this.loadStat();
  }

  loadStat(start = null, end = null) {
    let query: any = {
      place: this.navParams.data._id,
    };
    if (start && end) {
      query.start = start;
      query.end = end;
    }
    this.reviewService.find({
      query: query
    }).subscribe(reviews => {
      this.reviews = reviews.count;
    });
  }

  getStat(searchForm: NgForm) {
    this.loadStat(searchForm.form.value.start, searchForm.form.value.end);
  }
}
