import {Component, ElementRef, ViewChild} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {zip} from "rxjs/observable/zip";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-add-avatar-and-photos',
  templateUrl: 'add-avatar-and-photos.html',
})
export class AddAvatarAndPhotosPage {

  avatar: string;
  imagesToShow: string[] = [];
  images: string[] = [];
  disableSendButton = false;

  place;
  placeMultilang;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private placeService: PlacesProvider,
    private imagePicker: ImagePicker,
    private app: App,
    private placeMultilangService: PlaceMultilangProvider,
  ) {
  }

  ngOnInit() {
    this.disableSendButton = false;
    this.place = this.navParams.data.place;
    this.placeMultilang = this.navParams.data.placeMultilang;
  }

  uploadImage(event: Event) {
    this.disableSendButton = true;
    this.placeService.create(this.place).subscribe((place) => {
      this.placeMultilang.place = place._id;
      zip(
        this.placeMultilangService.create(this.placeMultilang),
        this.placeService.upload(place._id, {avatar: this.avatar, images: this.imagesToShow})
      ).subscribe(() => {
        this.disableSendButton = false;
        this.app.getRootNav().setRoot(HomePage);
      });
    });
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
