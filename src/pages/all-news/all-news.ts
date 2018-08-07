import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {News} from "../../models/promo/news/News";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {UpdateNewsPage} from "../update-news/update-news";
import {AuthProvider} from "../../providers/auth/auth";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {SingleNewsPage} from "../single-news/single-news";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-all-news',
  templateUrl: 'all-news.html',
})
export class AllNewsPage {

  principal = null;
  news: News[] = [];
  globalHost: string;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private newsService: NewsProvider,
    private app: App,
    private auth: AuthProvider,
    public modal: ModalController,
    private translate: TranslateService,
    private globalConfig: GlobalConfigsService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.globalHost = this.gc.getGlobalHost();
      this.loadNews().subscribe((news) => {
        this.news = news;
      });
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadNews()
      .subscribe((news) => {
        this.news = news;
        refresher.complete();
      });
  }

  loadNews() {
    return this.newsService.find({
      aggregate: [
        {$match: {topPromo: true}},
        {
          $lookup: {
            from: 'multilangs',
            localField: '_id',
            foreignField: 'promo',
            as: 'multilang',
          }
        },
        {$unwind: "$multilang"},
        {
          $lookup: {
            from: 'multilangs',
            localField: 'place',
            foreignField: 'place',
            as: 'place',
          }
        },
        {$unwind: "$place"},
        {$match: {'place.lang': this.gc.getGlobalLang(), 'multilang.lang': this.gc.getGlobalLang()}},
        {
          $project: {
            _id: 1,
            createdAt: 1,
            place: 1,
            multilang: 1,
            startDate: 1,
            endDate: 1,
            image: 1,
            kind: 1,
          }
        },
        {$sort: {createdAt: -1}},
        {$skip: this.skip},
        {$limit: this.limit},
      ]
    })
  }

  removePromo(promo: any) {
    this.newsService.remove(promo._id).subscribe();
    this.news.splice(this.news.indexOf(promo), 1);
  }


  updatePromo(promo: any) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: promo,
      page: UpdateNewsPage
    });
    modalItem.present();
  }

  loadNextNewsPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadNews()
        .subscribe((news) => {
          if (news.length < this.pageSize) this.allLoaded = true;
          this.news.push(...news);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }

  goToSingleNews(singleNews) {
    this.app.getRootNav().push(SingleNewsPage, {news: singleNews, pm: singleNews.place});
  }
}
