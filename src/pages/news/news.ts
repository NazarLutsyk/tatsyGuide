import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {News} from "../../models/promo/news/News";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: News[];
  globalHost: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private newsService: NewsProvider
  ) {
    this.globalHost = this.gc.getGlobalHost();
    newsService.find({
      query: {place: this.navParams.data._id},
      populate: [
        {
          path: 'multilang',
          match: {lang: gc.getGlobalLang()}
        }
      ]
    }).subscribe((news) => {
      this.news = news;
    });

  }

}
