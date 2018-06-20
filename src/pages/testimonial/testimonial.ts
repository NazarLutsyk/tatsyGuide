import {Component} from '@angular/core';
import {App, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {RatingProvider} from "../../providers/rating/rating-provider";
import {Rating} from "../../models/rating/Rating";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {ModalTestimonialPage} from "../modal-testimonial/modal-testimonial";
import {UpdateRatingPage} from "../update-rating/update-rating";
import {AuthProvider} from "../../providers/auth/auth";
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-testimonial',
  templateUrl: 'testimonial.html',
})
export class TestimonialPage {

  principal;

  ratings: Rating[];
  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ratingProvider: RatingProvider,
    private globalConfigProvider: GlobalConfigsService,
    private modal: ModalController,
    private app: App,
    private auth: AuthProvider,
    public translate: TranslateService,
    private events: Events
  ) {

    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  ngOnInit() {
    this.events.subscribe('refresh:ratings', () => {
      this.skip = 0;
      this.allLoaded = false;
      this.loadRatings().subscribe(ratings => this.ratings = ratings);
    });
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.loadRatings().subscribe(ratings => this.ratings = ratings);
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;
    this.loadRatings()
      .subscribe((ratings) => {
        this.ratings = ratings;
        refresher.complete();
      });
  }

  leaveTestimonial() {
    let modelComponent = this.modal.create(ModalTestimonialPage, {_id: this.navParams.data._id});
    modelComponent.onDidDismiss(() => {
      this.loadRatings();
    });
    modelComponent.present();
  }

  loadRatings() {
    let query =
      {
        query: {place: this.navParams.data._id},
        populate: [{path: 'client'}],
        skip: this.skip,
        limit: this.limit
      };
    return this.ratingProvider.find(query);
  }

  updateRating(rating) {
    this.app.getRootNav().push(UpdateRatingPage, {rating: rating});
  }

  removeRating(rating) {
    this.ratingProvider.remove(rating._id);
    this.ratings.splice(this.ratings.indexOf(rating), 1);
  }

  loadNextRatingsPage(event) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadRatings()
        .subscribe((ratings) => {
          if (ratings.length < this.pageSize) this.allLoaded = true;
          this.ratings.push(...ratings);
          event.complete();
        });
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }
}
