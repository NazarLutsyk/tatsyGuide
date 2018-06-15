import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";


@IonicPage()
@Component({
  selector: 'page-single-news',
  templateUrl: 'single-news.html',
})
export class SingleNewsPage {

  globalHost;
  singleNews: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService
  ) {
    this.globalHost = globalConfig.getGlobalHost();
  }

  ngOnInit() {
    this.singleNews = this.navParams.data;
  }

}
