import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {PlaceTypeProvider} from "../../providers/place-type/place-type";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {UpdatePlaceTypePage} from "../update-place-type/update-place-type";
import {CreatePlaceTypePage} from "../create-place-type/create-place-type";

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
  ) {
  }

  ngOnInit() {
    this.loadPlaceTypes().subscribe(placeTypesM => {
      this.placeTypesM = placeTypesM;
    });
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
      page: UpdatePlaceTypePage
    });
    modalItem.present();
  }

  goToRemovePlaceType(placeTypeM: any) {
    this.placeTypeService.remove(placeTypeM.placeType).subscribe(() => {
      this.placeTypesM.splice(this.placeTypesM.indexOf(placeTypeM, 1));
    });
  }
}
