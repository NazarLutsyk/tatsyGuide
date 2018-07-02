import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
  }

  close(showNextTime) {
    this.storage.set('initialpopover', showNextTime).then(() => {
      this.viewCtrl.dismiss();
    });
  }

}
