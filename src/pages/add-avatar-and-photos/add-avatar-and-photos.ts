import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";

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
  ) {
  }

  uploadImage() {

    this.placeService.upload(
      this.navParams.data.id,
      {avatar: this.avatar, images: this.imagesToShow}
    );

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
      console.log(imageData);
    })
  }

  async getImages() {
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 6,
      width : 640
    };
    this.imagesToShow = await this.imagePicker.getPictures(options);
  }
}
