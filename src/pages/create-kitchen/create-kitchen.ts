import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {LangProvider} from "../../providers/lang/lang";
import {KitchenProvider} from "../../providers/kitchen/kitchen";
import {KitchenMultilangProvider} from "../../providers/kitchen-multilang/kitchen-multilang";
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";

@IonicPage()
@Component({
  selector: 'page-create-kitchen',
  templateUrl: 'create-kitchen.html',
})
export class CreateKitchenPage {

  langs = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private langService: LangProvider,
    private kitchenService: KitchenProvider,
    private kitchenMultilangService: KitchenMultilangProvider,
    private events: Events,
  ) {
  }

  ngOnInit() {
    this.langs = this.globalConfig.langs;
  }

  createKitchen(kitchenForm: NgForm) {
    let kitchenValueForm = kitchenForm.form.value;
    this.kitchenService.create({}).subscribe((kitchenRes) => {
      let kitchenId = kitchenRes._id;
      let requests = [];
      for (const input in kitchenValueForm) {
        let langId = input;
        let value = kitchenValueForm[langId];
        let kitchenM = {
          kitchen: kitchenId,
          name: value,
          lang: langId
        };
        requests.push(this.kitchenMultilangService.create(kitchenM));
      }
      if (requests && requests.length > 0) {
        zip(...requests).subscribe(() => {
          this.events.publish('refresh:kitchens');
          this.navCtrl.pop()
        });
      } else {
        this.events.publish('refresh:kitchens');
        this.navCtrl.pop();
      }
    });
  }


}
