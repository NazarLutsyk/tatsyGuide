import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {KitchenProvider} from "../../providers/kitchen/kitchen";
import {KitchenMultilangProvider} from "../../providers/kitchen-multilang/kitchen-multilang";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-update-kitchen',
  templateUrl: 'update-kitchen.html',
})
export class UpdateKitchenPage {

  createNewMultilang = false;
  objectToShow: any = {name: ''};

  kitchenId = '';
  kitchenMId = '';
  choosenLang = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private kitchenService: KitchenProvider,
    private kitchenMultilangService: KitchenMultilangProvider
  ) {
  }

  ngOnInit() {
    this.kitchenId = this.navParams.data.object.kitchen;
    this.kitchenMId = this.navParams.data.object._id;
    this.choosenLang = this.navParams.data.choosenLang;

    this.kitchenMultilangService.find({
      query: {
        lang: this.choosenLang,
        kitchen: this.navParams.data.object.kitchen
      }
    }).subscribe(([ptm]) => {
      this.createNewMultilang = !(!!ptm);
      this.objectToShow = ptm ? ptm : {name: ''};
      this.kitchenMId = ptm ? ptm._id : '';
    })
  }

  updateKitchen(ptForm: NgForm) {
    let objectFromForm = ptForm.form.value;
    let observable: Observable<any>;
    if (this.createNewMultilang) {
      let multilangToCreate = {
        name: objectFromForm.name,
        lang: this.choosenLang,
        kitchen: this.kitchenId
      };
      observable = this.kitchenMultilangService.create(multilangToCreate);
    } else {
      observable = this.kitchenMultilangService.update(this.kitchenMId,objectFromForm);
    }
    observable.subscribe(res => this.navCtrl.pop());
  }


}
