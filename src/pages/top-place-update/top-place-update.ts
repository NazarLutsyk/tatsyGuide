import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

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
    private translate: TranslateService
  ) {

    this.translate.setDefaultLang("en");
    this.translate.use("ua");
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
