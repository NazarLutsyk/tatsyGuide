import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {RatingProvider} from "../../providers/rating/rating-provider";
import {Rating} from "../../models/rating/Rating";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {HttpClient} from "@angular/common/http";
import {ModalTestimonialPage} from "../modal-testimonial/modal-testimonial";


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
    private globalConfigProvider: GlobalConfigsService,
    private modal: ModalController,
    private http: HttpClient
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestimonialPage');
    this.ratingProvider.getRatingsOfCurrentPlace(this.navParams.data._id).subscribe(value => this.ratings = value);

  }


  leaveTestimonial() {
    console.log("asdsd");
    let modelComponent = this.modal.create(ModalTestimonialPage);
    modelComponent.present();


  }

}
