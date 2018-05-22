import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {BonuseMultilangProvider} from "../../providers/bonuse-multilang/bonuse-multilang";

@IonicPage()
@Component({
  selector: 'page-create-bonuse',
  templateUrl: 'create-bonuse.html',
})
export class CreateBonusePage {

  bonuseObject: {
    place: string,
    image: string,
    startDate: string,
    endDate: string
  } = {endDate: '', image: '', place: '', startDate: ''};

  bonuseMObject: {
    header: string,
    description: string,
    conditions: string,
    promo: string,
    lang: string
  } = {description: '', header: '', promo: '', lang: '', conditions: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private bonuseService: BonuseProvider,
    private bonuseMultilangService: BonuseMultilangProvider,
    private globalConfig: GlobalConfigsService
    ) {
  }

  ngOnInit() {
    this.bonuseObject.place = this.navParams.data.place._id;
    this.bonuseMObject.lang = this.globalConfig.getGlobalLang();
  }

  logForm() {
    this.bonuseService.create(this.bonuseObject).subscribe(bonuse => {
      this.bonuseMObject.promo = (<any>bonuse)._id;
      this.bonuseMultilangService.create(this.bonuseMObject).subscribe((bonuseM) => {
        this.bonuseService.upload((<any>bonuse)._id, this.bonuseObject.image).subscribe();
        this.navCtrl.pop();
      });
    })
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
      this.bonuseObject.image = 'data:image/jpeg;base64,' + imageData;
    })
  }
}
