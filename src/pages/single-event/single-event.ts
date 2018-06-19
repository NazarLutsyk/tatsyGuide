import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-single-event',
  templateUrl: 'single-event.html',
})
export class SingleEventPage {

  globalHost;
  event: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService
  ) {
    this.globalHost = globalConfig.getGlobalHost();
  }

  ngOnInit() {
    this.event = this.navParams.data.event;
    this.event.pm = this.navParams.data.pm;
  }

}
