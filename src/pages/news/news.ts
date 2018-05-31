import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {News} from "../../models/promo/news/News";
import {Place} from "../../models/place/Place";
import {CreateNewsPage} from "../create-news/create-news";
import {UpdateNewsPage} from "../update-news/update-news";
import {AuthProvider} from "../../providers/auth/auth";
import {DepartmentProvider} from "../../providers/department/department-provider";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  principal;
  departments;

  place: Place;
  news: News[];
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
    private departmentService: DepartmentProvider
  ) {
  }

  ngOnInit() {
    this.globalHost = this.gc.getGlobalHost();
    this.place = this.navParams.data;

    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.departmentService.find({
        query: {place: (<any>this.place)._id, client: this.principal._id},
      }).subscribe((departments) => {
        this.departments = departments;
        this.loadNews().subscribe((news) => {
          this.news = news;
        });
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
      ],
      skip: this.skip,
      limit: this.limit
    })
  }

  removePromo(promo: any) {
    this.newsService.remove(promo._id).subscribe();
    this.news.splice(this.news.indexOf(promo), 1);
  }


  updatePromo(promo: any) {
    this.app.getRootNav().push(UpdateNewsPage, {promo: promo});
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
}
