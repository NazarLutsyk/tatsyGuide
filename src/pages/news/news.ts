import {Component} from '@angular/core';
import {
  App,
  Events,
  InfiniteScroll,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Refresher
} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {News} from "../../models/promo/news/News";
import {Place} from "../../models/place/Place";
import {CreateNewsPage} from "../create-news/create-news";
import {UpdateNewsPage} from "../update-news/update-news";
import {AuthProvider} from "../../providers/auth/auth";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {SingleNewsPage} from "../single-news/single-news";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  principal;
  departments;

  place: Place;
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
    private departmentService: DepartmentProvider,
    public modal: ModalController,
    private events: Events,
  ) {
  }

  ngOnInit() {
    this.globalHost = this.gc.getGlobalHost();
    this.place = this.navParams.data;
    this.events.subscribe('refresh:news', () => {
      this.skip = 0;
      this.allLoaded = false;
      this.loadNews().subscribe(news => this.news = news);
    });

    this.auth.loadPrincipal({populate: [{path: 'departments'}]}).subscribe((principal) => {
      this.principal = principal;
      if (this.principal && this.principal.departments && this.principal.departments.length > 0) {
        this.principal.departments = this.principal.departments.map(dep => dep.place);
      }
      if (this.principal) {
        this.departmentService.find({
          query: {place: (<any>this.place)._id, client: this.principal._id},
        }).subscribe((departments) => {
          this.departments = departments;
          this.loadNews().subscribe(news => this.news = news);
        });
      } else {
        this.loadNews().subscribe(news => this.news = news);
      }
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

  goToCreateNews() {
    this.app.getRootNav().push(CreateNewsPage, {place: this.place});
  }

  loadNews() {
    return this.newsService.find({
      aggregate: [
        {$match: {place: this.navParams.data._id}},
        {
          $lookup: {
            from: 'multilangs',
            localField: '_id',
            foreignField: 'promo',
            as: 'multilang',
          }
        },
        {$unwind: "$multilang"},
        {$match: {'multilang.lang': this.place.multilang[0].lang}},
        {
          $project: {
            _id: 1,
            createdAt: 1,
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
    this.app.getRootNav().push(SingleNewsPage, {news: singleNews, pm: null});
  }
}
