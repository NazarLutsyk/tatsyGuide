import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {LangProvider} from "../../providers/lang/lang";
import {CityProvider} from "../../providers/city/city";
import {CityMultilangProvider} from "../../providers/city-multilang/city-multilang";
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";

@IonicPage()
@Component({
  selector: 'page-create-city',
  templateUrl: 'create-city.html',
})
export class CreateCityPage {

  langs = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private langService: LangProvider,
    private events: Events,
    private cityService: CityProvider,
    private cityMultilangService: CityMultilangProvider,
  ) {
  }

  ngOnInit() {
    this.langs = this.globalConfig.langs;
  }

  createCity(cityForm: NgForm) {
    let cityValueForm = cityForm.form.value;
    this.cityService.create({}).subscribe((kitchenRes) => {
      let cityId = kitchenRes._id;
      let requests = [];
      for (const input in cityValueForm) {
        let langId = input;
        let value = cityValueForm[langId];
        let cityM = {
          city: cityId,
          name: value,
          lang: langId
        };
        requests.push(this.cityMultilangService.create(cityM));
      }
      if (requests && requests.length > 0) {
        zip(...requests).subscribe(() => {
          this.events.publish('refresh:cities');
          this.navCtrl.pop()
        });
      } else {
        this.events.publish('refresh:cities');
        this.navCtrl.pop();
      }
    });
  }

}
