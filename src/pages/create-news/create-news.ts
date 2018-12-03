import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {NewsMultilangProvider} from "../../providers/news-multilang/news-multilang";
import {AuthProvider} from "../../providers/auth/auth";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {DateTimePickerConfigProvider} from "../../providers/date-time-picker-config/date-time-picker-config";


@IonicPage()
@Component({
  selector: 'page-create-news',
  templateUrl: 'create-news.html',
})
export class CreateNewsPage {

  imageToUpload;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private newsService: NewsProvider,
    private newsMultilangService: NewsMultilangProvider,
    private globalConfig: GlobalConfigsService,
    private auth: AuthProvider,
    private events: Events,
    public dateTimeConfig: DateTimePickerConfigProvider
  ) {
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
    })
  }

  logForm(newsForm: NgForm) {
    let formValues = newsForm.form.value;
    let news = formValues.news;
    let newsMultilang = formValues.multilang;
    news.place = this.navParams.data.place._id;
    newsMultilang.lang = this.navParams.data.place.multilang[0].lang;
    this.newsService.create(news).subscribe(news => {
      newsMultilang.promo = (<any>news)._id;
      this.newsMultilangService.create(newsMultilang).subscribe((newsM) => {
        this.newsService.upload((<any>news)._id, this.imageToUpload).subscribe();
        this.events.publish('refresh:news');
        this.navCtrl.pop();
      });
    })
  }

  getAvatar() {
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
      this.imageToUpload = imageData;
    })
  }

}
