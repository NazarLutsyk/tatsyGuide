import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {News} from "../../models/promo/news/News";
import {NewsMultilang} from "../../models/multilang/NewsMultilang";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {NewsMultilangProvider} from "../../providers/news-multilang/news-multilang";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-update-news',
  templateUrl: 'update-news.html',
})
export class UpdateNewsPage {

  news: News = new News();
  newsMultilang: NewsMultilang = new NewsMultilang();
  newsMultilangId: string;
  newsId: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsService: NewsProvider,
    private newsMultilangServive: NewsMultilangProvider,
    private auth: AuthProvider
  ) {
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
      this.newsService.find({
        query: {_id: this.navParams.data.object._id},
        populate: [{path: 'multilang', match: {lang: this.navParams.data.choosenLang}}]
      }).subscribe(([news]) => {
        this.news = news;
        this.newsId = news._id;
        this.newsMultilang = news.multilang[0];
        this.newsMultilangId = news.multilang[0]._id;
      })
    })

  }

  updatePromo(updateForm: NgForm) {
    //todo upload update
    this.newsMultilang = updateForm.form.value.multilang;
    this.news = updateForm.form.value.promo;

    let promoUpdateQuery = this.newsService.update(this.newsId, this.news);
    let promoMultilangQuery;
    if (this.newsMultilangId) {
      promoMultilangQuery =
        this.newsMultilangServive.update(this.newsMultilangId, this.newsMultilang);
    } else {
      this.newsMultilang.promo = <any>this.newsId;
      this.newsMultilang.lang = this.navParams.data.choosenLang;
      promoMultilangQuery =
        this.newsMultilangServive.create(this.newsMultilang);
    }

    zip(
      promoMultilangQuery,
      promoUpdateQuery
    ).subscribe(([multilang, news]) => this.navCtrl.pop());
  }

}
