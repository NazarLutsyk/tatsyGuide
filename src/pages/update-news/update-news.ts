import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {News} from "../../models/promo/news/News";
import {NewsMultilang} from "../../models/multilang/NewsMultilang";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {NewsMultilangProvider} from "../../providers/news-multilang/news-multilang";

@IonicPage()
@Component({
  selector: 'page-update-news',
  templateUrl: 'update-news.html',
})
export class UpdateNewsPage {

  news: News;
  newsMultilang: NewsMultilang;
  newsMultilangId: string;
  newsId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsService: NewsProvider,
    private newsMultilangServive: NewsMultilangProvider
  ) {
  }

  ngOnInit(){
    this.news = this.navParams.data.promo;
    this.newsMultilang = this.navParams.data.promo.multilang[0];
    this.newsMultilangId = (<any>this.newsMultilang)._id;
    this.newsId = (<any>this.news)._id;
  }

  updatePromo(updateForm: NgForm){
    //todo upload update
    this.newsMultilang = updateForm.form.value.multilang;
    this.news = updateForm.form.value.promo;
    zip(
      this.newsMultilangServive.update(this.newsMultilangId, this.newsMultilang),
      this.newsService.update(this.newsId, this.news)
    ).subscribe(([multilang,news]) => this.navCtrl.pop());
  }

}
