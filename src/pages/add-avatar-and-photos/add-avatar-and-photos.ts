import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {HttpClient} from "@angular/common/http";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";

@IonicPage()
@Component({
  selector: 'page-add-avatar-and-photos',
  templateUrl: 'add-avatar-and-photos.html',
})
export class AddAvatarAndPhotosPage {

  avatar: string;
  images: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private placeService: PlacesProvider,
    private imagePicker: ImagePicker
  ) {
  }

  uploadImage() {
    console.log(this.avatar);
    console.log(this.images);
    // this.placeService.upload(
    //   this.navParams.data.id,
    //   {avatar: this.avatar, images: this.images}
    // ).subscribe((place) => {
    //   console.log(place);
    // });
  }

  getAvatar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.avatar = 'data:image/jpeg;base64,' + imageData;
    })
  }

  getImages() {
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 6
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (const result of results) {
        this.images[this.images.length] = 'data:image/jpeg;base64,' + result;
      }
    });
  }
}
