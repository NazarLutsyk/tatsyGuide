import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopCategoryProvider} from "../../providers/top-category/top-category";
import {TopCategoryMultilangProvider} from "../../providers/top-category-multilang/top-category-multilang";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {CreateTopCategoryPage} from "../create-top-category/create-top-category";
import {UpdateTopCategoryPage} from "../update-top-category/update-top-category";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-all-top-categories',
  templateUrl: 'all-top-categories.html',
})
export class AllTopCategoriesPage {

  topCategoriesM = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private topCategoryService: TopCategoryProvider,
    private topCategoryMultilangService: TopCategoryMultilangProvider,
    private events: Events,
    public modal: ModalController,
    public alertCtrl: AlertController,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.events.subscribe('refresh:topcategories', () => {
      this.loadTopCategories().subscribe(topCategoriesM => this.topCategoriesM = topCategoriesM);
    });
    this.loadTopCategories().subscribe(topCategoriesM => this.topCategoriesM = topCategoriesM);
  }

  refresh(refresher: Refresher) {
    this.loadTopCategories().subscribe(topCategoriesM => {
      this.topCategoriesM = topCategoriesM;
      refresher.complete();
    });
  }

  loadTopCategories() {
    return this.topCategoryMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()},
    });
  }

  goToCreateTopCategory() {
    this.navCtrl.push(CreateTopCategoryPage);
  }

  goToUpdateTopCategory(topCategoryM: any) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: topCategoryM,
      page: UpdateTopCategoryPage
    });
    modalItem.present();
  }

  removeTopCategory(topCategoryM: any) {

    this.translate.get([
      "topCategoryRemove.cancel",
      "topCategoryRemove.confirm",
      "topCategoryRemove.text",
    ]).subscribe(translations => {

      let alertDelete = this.alertCtrl.create({
        enableBackdropDismiss: true,
        title: translations['topCategoryRemove.text'],
        buttons: [
          {
            text: translations['topCategoryRemove.confirm'],
            handler: () => {
              this.topCategoryService.remove(topCategoryM.topCategory).subscribe(() => {
                this.topCategoriesM.splice(this.topCategoriesM.indexOf(topCategoryM, 1));
              });

            }
          },
          {
            text: translations['topCategoryRemove.cancel']
          }
        ]
      });
      alertDelete.present()
    });
  }

}
