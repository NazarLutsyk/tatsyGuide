import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {TranslateService} from "@ngx-translate/core";
import {DateTimePickerConfigProvider} from "../../providers/date-time-picker-config/date-time-picker-config";

@IonicPage()
@Component({
  selector: 'page-create-top-place',
  templateUrl: 'create-top-place.html',
})
export class CreateTopPlacePage {

  placeName = '';
  placeId = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private translate: TranslateService,
    public datePickerConfig: DateTimePickerConfigProvider
  ) {
  }

  ngOnInit() {
    this.placeName = this.navParams.data.multilang[0].name;
    this.placeId = this.navParams.data._id;
  }

  createTopPlace(topPlaceForm: NgForm) {
    let topPlace = topPlaceForm.form.value;
    topPlace.place = this.placeId;
    this.topPlaceService
      .create(topPlace)
      .subscribe(newTopPlace => {
        this.navCtrl.pop();
      });
  }
}
