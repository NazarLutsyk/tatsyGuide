import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {KitchenProvider} from "../../providers/kitchen/kitchen";
import {KitchenMultilangProvider} from "../../providers/kitchen-multilang/kitchen-multilang";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {CreateKitchenPage} from "../create-kitchen/create-kitchen";
import {UpdateKitchenPage} from "../update-kitchen/update-kitchen";
import {TranslateService} from "@ngx-translate/core";

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
    private translate: TranslateService
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
      sort: {name: 1}
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

    this.translate.get([
      "kitchenRemove.cancel",
      "kitchenRemove.confirm",
      "kitchenRemove.text",
    ]).subscribe(translations => {

      let alertDelete = this.alertCtrl.create({
        enableBackdropDismiss: true,
        title: translations['kitchenRemove.text'],
        buttons: [
          {
            text: translations['kitchenRemove.confirm'],
            handler: () => {
              this.kitchenService.remove(kitchenM.kitchen).subscribe(() => {
                this.kitchensM.splice(this.kitchensM.indexOf(kitchenM, 1));
              });

            }
          },
          {
            text: translations['kitchenRemove.cancel']
          }
        ]
      });
      alertDelete.present()
    });
  }


}
