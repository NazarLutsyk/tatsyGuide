import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {BonuseMultilangProvider} from "../../providers/bonuse-multilang/bonuse-multilang";
import {AuthProvider} from "../../providers/auth/auth";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {DateTimePickerConfigProvider} from "../../providers/date-time-picker-config/date-time-picker-config";

@IonicPage()
@Component({
  selector: 'page-create-bonuse',
  templateUrl: 'create-bonuse.html',
})
export class CreateBonusePage {

  isAdmin = false;
  imageToUpload;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private bonuseService: BonuseProvider,
    private bonuseMultilangService: BonuseMultilangProvider,
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

  logForm(bonuseForm: NgForm) {
    let bonuseFormValues = bonuseForm.form.value;
    let bonuse = bonuseFormValues.bonuse;
    let bonuseMultilang = bonuseFormValues.multilang;
    bonuse.place = this.navParams.data.place._id;
    bonuseMultilang.lang = this.navParams.data.place.multilang[0].lang;
    this.bonuseService.create(bonuse).subscribe(bonuse => {
      bonuseMultilang.promo = (<any>bonuse)._id;
      this.bonuseMultilangService.create(bonuseMultilang).subscribe((bonuseM) => {
        this.bonuseService.upload((<any>bonuse)._id, this.imageToUpload).subscribe();
        this.events.publish('refresh:bonuses');
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
      console.log(imageData);
    })
  }
}
