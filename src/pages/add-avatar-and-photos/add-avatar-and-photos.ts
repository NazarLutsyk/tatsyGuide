import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {HomePage} from "../home/home";
import {TranslateService} from "@ngx-translate/core";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-add-avatar-and-photos',
  templateUrl: 'add-avatar-and-photos.html',
})
export class AddAvatarAndPhotosPage {

  avatar: string;
  imagesToShow: string[] = [];
  images: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private placeService: PlacesProvider,
    private imagePicker: ImagePicker,
    private app: App,
    private translate: TranslateService,
    private globalConfig : GlobalConfigsService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use(this.globalConfig.deviceLang);
  }

  uploadImage() {

    this.placeService.upload(
      this.navParams.data.id,
      {avatar: this.avatar, images: this.imagesToShow}
    ).subscribe(() => {
      this.app.getRootNav().setRoot(HomePage);

    });

  }

  // async getAvatar() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   };
  //   this.avatar = await this.camera.getPicture(options);
  // }


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
      this.avatar = imageData;
    })
  }

  async getImages() {
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 6,
      width: 640
    };
    this.imagesToShow = await this.imagePicker.getPictures(options);
  }
}
