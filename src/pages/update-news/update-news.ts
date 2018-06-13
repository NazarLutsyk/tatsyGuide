import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {News} from "../../models/promo/news/News";
import {NewsMultilang} from "../../models/multilang/NewsMultilang";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {NewsMultilangProvider} from "../../providers/news-multilang/news-multilang";
import {AuthProvider} from "../../providers/auth/auth";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Camera, CameraOptions} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-update-news',
  templateUrl: 'update-news.html',
})
export class UpdateNewsPage {

  globalHost;
  news: News = new News();
  newsMultilang: NewsMultilang = new NewsMultilang();
  newsMultilangId: string;
  newsId: string;
  image: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsService: NewsProvider,
    private newsMultilangServive: NewsMultilangProvider,
    private auth: AuthProvider,
    private globalConfig: GlobalConfigsService,
    private camera: Camera
  ) {
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();
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
        this.image = news.image;
      })
    })

  }

  updatePromo(updateForm: NgForm) {
    let uploadImg = new Observable((subscriber) => subscriber.next(true));

    if (this.news.image !== this.image) {
      uploadImg = this.newsService.upload(this.newsId, this.image);
    }

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
      promoUpdateQuery,
      uploadImg
    ).subscribe(([multilang, news]) => this.navCtrl.pop());
  }

  setNewImage(input) {
    input.preventDefault();

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1280,
      targetHeight: 960,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
    })

  }
}
