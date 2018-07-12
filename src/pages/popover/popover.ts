import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";

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
    public storage: Storage,
    private translate : TranslateService
  ) {
  }

  close(showNextTime) {
    this.storage.set('initialpopover', showNextTime).then(() => {
      this.viewCtrl.dismiss();
    });
  }

}
