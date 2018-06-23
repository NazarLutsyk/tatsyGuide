import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {BonuseMultilangProvider} from "../../providers/bonuse-multilang/bonuse-multilang";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {BonuseMultilang} from "../../models/multilang/BonuseMultilang";
import {AuthProvider} from "../../providers/auth/auth";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-update-bonuse',
  templateUrl: 'update-bonuse.html',
})
export class UpdateBonusePage {

  globalHost;
  bonuse: Bonuse = new Bonuse();
  bonuseMultilang: BonuseMultilang = new BonuseMultilang();
  bonuseMultilangId: string;
  bonuseId: string;
  image: string;
  imageToShow: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bonuseService: BonuseProvider,
    private bonuseMultilangServive: BonuseMultilangProvider,
    private auth: AuthProvider,
    private globalConfig: GlobalConfigsService,
    private camera: Camera,
    private translate : TranslateService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();

    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
      this.bonuseService.find({
        query: {_id: this.navParams.data.object._id},
        populate: [{path: 'multilang', match: {lang: this.navParams.data.choosenLang}}]
      }).subscribe(([bonuse]) => {
        this.bonuse = bonuse;
        this.bonuseId = bonuse._id;
        if (bonuse.multilang[0]) {
          this.bonuseMultilang = bonuse.multilang[0];
          this.bonuseMultilangId = bonuse.multilang[0]._id;
        }
        this.imageToShow = this.globalHost + this.bonuse.image;
      })
    })

  }

  updatePromo(updateForm: NgForm) {
    let uploadImg = new Observable((subscriber)=>subscriber.next(true));

    if (this.bonuse.image !== this.image) {
      uploadImg = this.bonuseService.upload(this.bonuseId, this.image);
    }

    this.bonuseMultilang = updateForm.form.value.multilang;
    this.bonuse = updateForm.form.value.promo;

    let promoUpdateQuery = this.bonuseService.update(this.bonuseId, this.bonuse);
    let promoMultilangQuery;
    if (this.bonuseMultilangId) {
      promoMultilangQuery =
        this.bonuseMultilangServive.update(this.bonuseMultilangId, this.bonuseMultilang);
    } else {
      this.bonuseMultilang.promo = <any>this.bonuseId;
      this.bonuseMultilang.lang = this.navParams.data.choosenLang;
      promoMultilangQuery =
        this.bonuseMultilangServive.create(this.bonuseMultilang);
    }

    zip(
      promoMultilangQuery,
      promoUpdateQuery,
      uploadImg
    ).subscribe(([multilang, bonuse]) => this.navCtrl.pop());
  }

  setNewImage(input) {
    input.preventDefault();
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
      this.image = imageData;
      this.imageToShow = imageData;
    })
  }

}
