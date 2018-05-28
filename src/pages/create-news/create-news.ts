import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {NewsMultilangProvider} from "../../providers/news-multilang/news-multilang";
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {AuthProvider} from "../../providers/auth/auth";
import {News} from "../../models/promo/news/News";
import {NewsMultilang} from "../../models/multilang/NewsMultilang";
import {NgForm} from "@angular/forms";


/**
 * Generated class for the CreateNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private auth: AuthProvider
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
    newsMultilang.lang = this.globalConfig.getGlobalLang();
    this.newsService.create(news).subscribe(news => {
      newsMultilang.promo = (<any>news)._id;
      this.newsMultilangService.create(newsMultilang).subscribe((newsM) => {
        this.newsService.upload((<any>news)._id, this.imageToUpload).subscribe();
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
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageToUpload = imageData;
    })
  }

}
