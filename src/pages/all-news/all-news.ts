import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {News} from "../../models/promo/news/News";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {UpdateNewsPage} from "../update-news/update-news";

@IonicPage()
@Component({
  selector: 'page-all-news',
  templateUrl: 'all-news.html',
})
export class AllNewsPage {

  news: News[];
  globalHost: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private newsService: NewsProvider,
    private app: App
  ) {
    this.globalHost = this.gc.getGlobalHost();
    this.loadNews().subscribe((news) => {
      this.news = news;
    });
  }

  doRefresh(refresher: Refresher) {
    this.loadNews()
      .subscribe((news) => {
        this.news = news;
        refresher.complete();
      });
  }

  loadNews() {
    return this.newsService.find({
      query: {topPromo: true},
      sort: {createdAt: -1},
      populate: [
        {
          path: 'multilang',
          match: {lang: this.gc.getGlobalLang()}
        },
        {
          path: 'place',
          select: 'multilang',
          populate: [{
            path: 'multilang',
            match: {lang: this.gc.getGlobalLang()},
            select: 'name'
          }]
        }
      ]
    })
  }

  removePromo(promo: any) {
    this.newsService.remove(promo._id).subscribe();
    this.news.splice(this.news.indexOf(promo), 1);
  }


  updatePromo(promo: any) {
    this.app.getRootNav().push(UpdateNewsPage, {promo: promo});
  }


}
