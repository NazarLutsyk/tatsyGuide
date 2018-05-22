import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {NewsMultilangProvider} from "../../providers/news-multilang/news-multilang";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



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

  newsObject: {
    place: string,
    image: string,
    startDate: string,
    endDate: string
  } = {endDate: '', image: '', place: '', startDate: ''};

  newsMObject: {
    header: string,
    description: string,
    promo: string,
    lang: string
  } = {description: '', header: '', promo: '', lang: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private newsService: NewsProvider,
    private newsMultilangService: NewsMultilangProvider,
    private globalConfig: GlobalConfigsService
  ) {
  }

  ngOnInit() {
    this.newsObject.place = this.navParams.data.place._id;
    this.newsMObject.lang = this.globalConfig.getGlobalLang();
  }

  logForm() {
    this.newsService.create(this.newsObject).subscribe(news => {
      this.newsMObject.promo = (<any>news)._id;
      this.newsMultilangService.create(this.newsMObject).subscribe((newsM) => {
        this.newsService.upload((<any>news)._id, this.newsObject.image).subscribe();
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
      this.newsObject.image = imageData;
    })
  }

  changeListener($event) {
    console.log($event);
  }
}
