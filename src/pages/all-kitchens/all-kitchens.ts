import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {KitchenProvider} from "../../providers/kitchen/kitchen";
import {KitchenMultilangProvider} from "../../providers/kitchen-multilang/kitchen-multilang";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {CreateKitchenPage} from "../create-kitchen/create-kitchen";
import {UpdateKitchenPage} from "../update-kitchen/update-kitchen";

@IonicPage()
@Component({
  selector: 'page-all-kitchens',
  templateUrl: 'all-kitchens.html',
})
export class AllKitchensPage {

  kitchensM = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private kitchenService: KitchenProvider,
    private kitchenMultilangService: KitchenMultilangProvider,
    private events: Events,
    public modal: ModalController,
    public alertCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this.events.subscribe('refresh:kitchens', () => {
      this.loadKitchens().subscribe(kitchensM => this.kitchensM = kitchensM);
    });
    this.loadKitchens().subscribe(kitchensM => this.kitchensM = kitchensM);
  }

  refresh(refresher: Refresher) {
    this.loadKitchens().subscribe(kitchensM => {
      this.kitchensM = kitchensM;
      refresher.complete();
    });
  }

  loadKitchens() {
    return this.kitchenMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()},
    });
  }

  goToCreateKitchen() {
    this.navCtrl.push(CreateKitchenPage);
  }

  goToUpdateKitchen(kitchenM: any) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: kitchenM,
      page: UpdateKitchenPage
    });
    modalItem.present();
  }

  removeKitchen(kitchenM: any) {

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
            this.kitchenService.remove(kitchenM.kitchen).subscribe(() => {
              this.kitchensM.splice(this.kitchensM.indexOf(kitchenM, 1));
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
