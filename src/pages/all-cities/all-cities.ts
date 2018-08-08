import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {CityProvider} from "../../providers/city/city";
import {CityMultilangProvider} from "../../providers/city-multilang/city-multilang";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {CreateCityPage} from "../create-city/create-city";
import {UpdateCityPage} from "../update-city/update-city";

@IonicPage()
@Component({
  selector: 'page-all-cities',
  templateUrl: 'all-cities.html',
})
export class AllCitiesPage {

  citiesM = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private events: Events,
    public modal: ModalController,
    public alertCtrl: AlertController,
    private cityService: CityProvider,
    private cityMultilangService: CityMultilangProvider,
  ) {
  }

  ngOnInit() {
    this.events.subscribe('refresh:cities', () => {
      this.loadCities().subscribe(citiesM => this.citiesM = citiesM);
    });
    this.loadCities().subscribe(citiesM => this.citiesM = citiesM);
  }

  refresh(refresher: Refresher) {
    this.loadCities().subscribe(citiesM => {
      this.citiesM = citiesM;
      refresher.complete();
    });
  }

  loadCities() {
    return this.cityMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()},
    });
  }

  goToCreateCity() {
    this.navCtrl.push(CreateCityPage);
  }

  goToUpdateCity(cityM: any) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: cityM,
      page: UpdateCityPage
    });
    modalItem.present();
  }

  removeCity(cityM: any) {

    //todo Serj translate
    // this.translate.get([
    //   "placeInfo.cancel",
    //   "placeInfo.confirm",
    //   "placeInfo.delete",
    // ]).subscribe(translations => {

    let alertDelete = this.alertCtrl.create({
      enableBackdropDismiss: true,
      title: /*translations['placeInfo.delete'] + "?"*/ "Delete?",
      buttons: [
        {
          text: /*translations['placeInfo.confirm']*/ "Delete",
          handler: () => {
            this.cityService.remove(cityM.city).subscribe(() => {
              this.citiesM.splice(this.citiesM.indexOf(cityM, 1));
            });

          }
        },
        {
          text: /*translations['placeInfo.cancel']*/ 'Cancel'
        }
      ]
    });
    alertDelete.present()
    // });
  }

}
