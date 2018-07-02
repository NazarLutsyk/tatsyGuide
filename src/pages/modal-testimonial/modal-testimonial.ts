import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Rating} from "../../models/rating/Rating";
import {RatingProvider} from "../../providers/rating/rating-provider";
import {TranslateService} from "@ngx-translate/core";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";


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
              private ratingService: RatingProvider,
              private translate: TranslateService,
              private events: Events,
              private globalConfig : GlobalConfigsService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  logForm() {
    let rating = new Rating(null, this.stars, this.text, this.sum, null, this.navParams.data._id);
    this.ratingService.create(rating).subscribe(rating => {
      this.events.publish('refresh:ratings');
      this.navCtrl.pop()
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }


}
