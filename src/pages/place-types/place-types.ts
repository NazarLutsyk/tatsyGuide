import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {PlaceTypeProvider} from "../../providers/place-type/place-type";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {UpdatePlaceTypePage} from "../update-place-type/update-place-type";
import {CreatePlaceTypePage} from "../create-place-type/create-place-type";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-place-types',
  templateUrl: 'place-types.html',
})
export class PlaceTypesPage {

  placeTypesM = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private placeTypeService: PlaceTypeProvider,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    public modal: ModalController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    private events: Events
  ) {

    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  ngOnInit() {
    this.events.subscribe('refresh:placetypes', () => {
      this.loadPlaceTypes().subscribe(placeTypesM => this.placeTypesM = placeTypesM);
    });
    this.loadPlaceTypes().subscribe(placeTypesM => this.placeTypesM = placeTypesM);
  }

  refresh(refresher: Refresher) {
    this.loadPlaceTypes().subscribe(placeTypesM => {
      this.placeTypesM = placeTypesM;
      refresher.complete();
    });
  }

  loadPlaceTypes() {
    return this.placeTypeMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()},
    });
  }

  goToCreatePlaceType() {
    this.navCtrl.push(CreatePlaceTypePage);
  }

  goToUpdatePlaceType(placeTypeM: any) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: placeTypeM,
      page: UpdatePlaceTypePage // куда отправляемся после выбора языка
    });
    modalItem.present();
  }

  removePlaceType(placeTypeM: any) {

    this.translate.get([
      "placeInfo.cancel",
      "placeInfo.confirm",
      "placeInfo.delete",
    ]).subscribe(translations => {

      let alertDelete = this.alertCtrl.create({
        enableBackdropDismiss: true,
        title: translations['placeInfo.delete'] + "?",
        buttons: [
          {
            text: translations['placeInfo.confirm'],
            handler: () => {
              this.placeTypeService.remove(placeTypeM.placeType).subscribe(() => {
                this.placeTypesM.splice(this.placeTypesM.indexOf(placeTypeM, 1));
              });

            }
          },
          {
            text: translations['placeInfo.cancel']
          }
        ]
      });
      alertDelete.present()

    });
  }
}
