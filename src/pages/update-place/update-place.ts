import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {PlaceMultilang} from "../../models/multilang/PlaceMultilang";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {PlaceTypeMultilang} from "../../models/multilang/PlaceTypeMultilang";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {ChooseLocationPage} from "../choose-location/choose-location";
import {AuthProvider} from "../../providers/auth/auth";
import {Observable} from "rxjs/Observable";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {TranslateService} from "@ngx-translate/core";
import {KitchenMultilang} from "../../models/multilang/KitchenMultilang";
import {TopCategoryMultilang} from "../../models/multilang/TopCategoryMultilang";
import {CityMultilang} from "../../models/multilang/CityMultilang";
import {KitchenMultilangProvider} from "../../providers/kitchen-multilang/kitchen-multilang";
import {TopCategoryMultilangProvider} from "../../providers/top-category-multilang/top-category-multilang";
import {CityMultilangProvider} from "../../providers/city-multilang/city-multilang";


@IonicPage()
@Component({
  selector: 'page-update-place',
  templateUrl: 'update-place.html',
})
export class UpdatePlacePage {

  @ViewChild('form') form: NgForm;

  place: Place = new Place();
  location: { lat: number, lng: number };
  placeId: string;
  placeMultilang: PlaceMultilang = new PlaceMultilang();
  placeMultilangId: string;
  placeTypesM: PlaceTypeMultilang[] = [];
  kitchensM: KitchenMultilang[] = [];
  topCategoriesM: TopCategoryMultilang[] = [];
  citiesM: CityMultilang[] = [];
  hashTags: string = '';
  isAdmin = false;
  globalHost;
  imagesToShow = [];
  imagesToUpload = [];
  imagesToUpdate = [];
  avatarToShow = '';
  avatarToUpload = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placeService: PlacesProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    private kitchenMultilangProvider: KitchenMultilangProvider,
    private topCatrgoryMultilangProvider: TopCategoryMultilangProvider,
    private cityMultilangProvider: CityMultilangProvider,
    private globalConfig: GlobalConfigsService,
    private event: Events,
    private auth: AuthProvider,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private translate: TranslateService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
    this.event.subscribe("choosePosition", (data) => {
      this.location.lat = data.lat;
      this.location.lng = data.lng;
    });

  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();

    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
    });
    let currentPlace = this.placeService.findOne(this.navParams.data.object.id, {
      populate:
        [
          {
            path: "multilang", match: {lang: this.navParams.data.choosenLang}
          }
        ]
    });


    let currentPlaceTypeMultilang = this.placeTypeMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    });
    let currentCityMultilang = this.cityMultilangProvider.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    });
    let currentTopCategoryMultilang = this.topCatrgoryMultilangProvider.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    });
    let currentKitchenMultilang = this.kitchenMultilangProvider.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    });

    zip(currentPlace, currentPlaceTypeMultilang, currentCityMultilang, currentTopCategoryMultilang, currentKitchenMultilang).subscribe(values => {
      this.place = values[0];
      this.placeMultilang = this.place.multilang[0] ? this.place.multilang[0] : new PlaceMultilang();
      this.placeMultilangId = (<any>this.placeMultilang)._id;
      this.placeId = (<any>this.place)._id;

      this.location = this.place.location;
      this.hashTags = this.place.hashTags.join(',');

      this.placeTypesM = values[1];
      this.citiesM = values[2];
      this.topCategoriesM = values[3];
      this.kitchensM = values[4];

      this.avatarToShow = this.place.avatar ? this.globalHost + this.place.avatar : '';
      this.imagesToShow = this.place.images ? this.place.images.map(image => this.globalHost + image) : [];
      this.imagesToUpdate = this.place.images ? this.place.images : [];
    });

  }

  updatePlace(updateForm: NgForm) {
    let toUpload: any = {};
    let uploadImg = new Observable((subscriber) => subscriber.next(true));
    if (this.avatarToUpload) {
      toUpload.avatar = this.avatarToUpload;
    }
    if (this.imagesToUpload.length > 0) {
      toUpload.images = this.imagesToUpload;
    }
    if (Object.keys(toUpload).length > 0) {
      uploadImg = this.placeService.upload(this.placeId, toUpload)
    }
    this.placeMultilang = updateForm.form.value.multilang;
    this.place = updateForm.form.value.place;

    if (this.isAdmin && updateForm.form.value.place.topCategories) {
      this.place.topCategories = updateForm.form.value.place.topCategories;

    }

    this.place.images = this.imagesToUpdate;
    this.place.hashTags =
      this.hashTags.length > 0 ? this.hashTags.replace(/[#' ']/gi, '').split(',').filter(value => value.length > 0) : [];
    this.place.days = {
      1: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      2: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      3: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      4: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      5: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      6: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      7: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end}
    };
    this.place.location = this.location;

    let placeUpdateQuery = this.placeService.update(this.placeId, this.place);
    let placeMultilangUpdateQuery;
    if (this.placeMultilangId) {
      placeMultilangUpdateQuery =
        this.placeMultilangService.update(this.placeMultilangId, this.placeMultilang);
    } else {
      this.placeMultilang.place = <any>this.placeId;
      this.placeMultilang.lang = this.navParams.data.choosenLang;
      placeMultilangUpdateQuery =
        this.placeMultilangService.create(this.placeMultilang);
    }
    zip(
      placeMultilangUpdateQuery,
      placeUpdateQuery,
      uploadImg
    ).subscribe(([multilang, place, res]) => {
      this.navCtrl.pop()
    });
  }

  goToChooseLocation() {
    this.navCtrl.push(ChooseLocationPage)
  }

  changeAvatar($event) {
    $event.preventDefault();
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
      this.avatarToShow = imageData;
      this.avatarToUpload = imageData;
    })

  }

  removeImage(image: any, $event) {
    $event.preventDefault();
    this.imagesToShow.splice(this.imagesToShow.indexOf(image), 1);
    this.imagesToUpdate.splice(this.imagesToUpdate.indexOf(image), 1);
  }

  async addImage($event) {
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 6,
      width: 640
    };
    let pictures = await this.imagePicker.getPictures(options);
    this.imagesToUpload.push(...pictures);
    this.imagesToShow.push(...pictures);
  }
}
