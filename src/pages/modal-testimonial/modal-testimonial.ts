import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

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
              public viewController: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTestimonialPage');
  }

  dismiss() {
    this.viewController.dismiss();

  }

  logForm() {
    console.log(this.text, this.stars, +this.sum);
    // todo Nazik add testimonial
    // todo SZ do event subscription that fetch testimonials for place

    this.dismiss();
  }


}
