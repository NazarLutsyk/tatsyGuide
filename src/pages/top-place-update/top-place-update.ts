import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DateTimePickerConfigProvider} from "../../providers/date-time-picker-config/date-time-picker-config";

@IonicPage()
@Component({
  selector: 'page-top-place-update',
  templateUrl: 'top-place-update.html',
})
export class TopPlaceUpdatePage {

  topPlace;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private translate: TranslateService,
    private globalConfig : GlobalConfigsService,
    public datePickerConfig: DateTimePickerConfigProvider
  ) {

    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.topPlace = this.navParams.data;
  }

  updateTopPlace(topPlaceForm: NgForm) {
    let update = {
      startDate: this.topPlace.startDate,
      endDate: this.topPlace.endDate,
      price: this.topPlace.price,
      actual: this.topPlace.actual
    };
    this.topPlaceService.update(
      (<any>this.topPlace)._id,
      update
    ).subscribe(newTopPlace => this.navCtrl.pop());
  }


}
