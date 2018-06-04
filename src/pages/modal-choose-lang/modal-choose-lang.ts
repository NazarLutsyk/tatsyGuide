import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UpdatePlacePage} from "../update-place/update-place";

/**
 * Generated class for the ModalChooseLangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-choose-lang',
  templateUrl: 'modal-choose-lang.html',
})
export class ModalChooseLangPage {

  lang: string;

  constructor(
    public viewController: ViewController,
    public app: App,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalChooseLangPage');
  }


  goToUpdate() {
    console.log(this.lang);
    let place = this.navParams.data;
    place.choosenLang = this.lang;

    this.viewController.dismiss();
    this.app.getRootNav().push(UpdatePlacePage, place);

  }
}
