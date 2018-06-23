import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-update-drink-application',
  templateUrl: 'update-drink-application.html',
})
export class UpdateDrinkApplicationPage {

  drinkApp: DrinkApplication;
  drinkAppId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private drinkAppService: DrinkApplicationProvider,
    private translate : TranslateService,private globalConfig : GlobalConfigsService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.drinkApp = this.navParams.data.drinkApp;
    this.drinkAppId = (<any>this.drinkApp)._id;
  }

  updateDrinkApp(updateForm: NgForm) {
    this.drinkApp = updateForm.form.value;
    this.drinkAppService.update(this.drinkAppId, this.drinkApp)
      .subscribe((drinkApp) => this.navCtrl.pop());
  }
}
