import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {News} from "../../models/promo/news/News";
import {CreateEventPage} from "../create-event/create-event";
import {Place} from "../../models/place/Place";
import {CreateNewsPage} from "../create-news/create-news";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  place: Place;
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

  ngOnInit() {
    this.place = this.navParams.data;
  }


  doRefresh(refresher: Refresher) {
    this.loadNews()
      .subscribe((news) => {
        this.news = news;
        refresher.complete();
      });
  }

  goToCreateNews() {
    this.app.getRootNav().push(CreateNewsPage, {place: this.place});
  }

  loadNews() {
    return this.newsService.find({
      query: {place: this.navParams.data._id},
      populate: [
        {
          path: 'multilang',
          match: {lang: this.gc.getGlobalLang()}
        }
      ]
    })
  }
}
