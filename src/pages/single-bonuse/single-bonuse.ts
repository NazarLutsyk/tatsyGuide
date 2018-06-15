import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-single-bonuse',
  templateUrl: 'single-bonuse.html',
})
export class SingleBonusePage {

  globalHost;
  bonuse: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService
    ) {
    this.globalHost = globalConfig.getGlobalHost();
  }

  ngOnInit() {
    this.bonuse = this.navParams.data;
  }

}
