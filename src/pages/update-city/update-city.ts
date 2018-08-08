import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {CityProvider} from "../../providers/city/city";
import {CityMultilangProvider} from "../../providers/city-multilang/city-multilang";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-update-city',
  templateUrl: 'update-city.html',
})
export class UpdateCityPage {

  createNewMultilang = false;
  objectToShow: any = {name: ''};

  cityId = '';
  cityMId = '';
  choosenLang = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private cityService: CityProvider,
    private cityMultilangService: CityMultilangProvider,
  ) {
  }

  ngOnInit() {
    this.cityId = this.navParams.data.object.city;
    this.cityMId = this.navParams.data.object._id;
    this.choosenLang = this.navParams.data.choosenLang;

    this.cityMultilangService.find({
      query: {
        lang: this.choosenLang,
        city: this.navParams.data.object.city
      }
    }).subscribe(([ptm]) => {
      this.createNewMultilang = !(!!ptm);
      this.objectToShow = ptm ? ptm : {name: ''};
      this.cityMId = ptm ? ptm._id : '';
    })
  }

  updateCity(ptForm: NgForm) {
    let objectFromForm = ptForm.form.value;
    let observable: Observable<any>;
    if (this.createNewMultilang) {
      let multilangToCreate = {
        name: objectFromForm.name,
        lang: this.choosenLang,
        city: this.cityId
      };
      observable = this.cityMultilangService.create(multilangToCreate);
    } else {
      observable = this.cityMultilangService.update(this.cityMId,objectFromForm);
    }
    observable.subscribe(res => this.navCtrl.pop());
  }

}
