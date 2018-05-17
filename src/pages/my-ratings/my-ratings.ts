import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {RatingProvider} from "../../providers/rating/rating-provider";
import {ModalTestimonialPage} from "../modal-testimonial/modal-testimonial";
import {Rating} from "../../models/rating/Rating";
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Client} from "../../models/client/Client";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-my-ratings',
  templateUrl: 'my-ratings.html',
})
export class MyRatingsPage {

  principal: Client;
  ratings: Rating[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ratingProvider: RatingProvider,
    private globalConfigProvider: GlobalConfigsService,
    private modal: ModalController,
    private auth: AuthProvider
  ) {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.loadRatings();
    });
  }

  ngOnInit() {
  }

  loadRatings() {
    let query = {query: {client: (<any>this.principal)._id}};
    this.ratingProvider.getRatings(query).subscribe(value => {
      this.ratings = value
    });
  }
}
