import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {RatingProvider} from "../../providers/rating/rating-provider";
import {Rating} from "../../models/rating/Rating";
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
    let query =
      {
        query: {client: (<any>this.principal)._id},
        populate: [{path: 'client'}]
      };
    this.ratingProvider.find(query).subscribe(value => this.ratings = value);
  }

  removeRating(rating) {
    this.ratingProvider.remove(rating._id);
    this.ratings.splice(this.ratings.indexOf(rating), 1);
  }
}
