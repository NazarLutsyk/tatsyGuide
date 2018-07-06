import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PlaceTypeProvider} from "../../providers/place-type/place-type";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {LangProvider} from "../../providers/lang/lang";
import {zip} from "rxjs/observable/zip";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-create-place-type',
  templateUrl: 'create-place-type.html',
})
export class CreatePlaceTypePage {

  langs = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private langService: LangProvider,
    private placeTypeService: PlaceTypeProvider,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    private events: Events,
    private translate : TranslateService
  ) {
  }

  ngOnInit() {
    this.langs = this.globalConfig.langs;
  }

  createPlaceType(placeTypeForm: NgForm) {
    let placeTypeFromForm = placeTypeForm.form.value;
    this.placeTypeService.create({}).subscribe((placeTypeRes) => {
      let placeTypeId = (<any>placeTypeRes)._id;
      let requests = [];
      for (const input in placeTypeFromForm) {
        let langId = input;
        let value = placeTypeFromForm[input];
        let placeTypeM = {
          placeType: placeTypeId,
          name: value,
          lang: langId
        };
        requests.push(this.placeTypeMultilangService.create(placeTypeM));
      }
      if (requests && requests.length > 0) {
        zip(...requests).subscribe(() => {
          this.events.publish('refresh:placetypes');
          this.navCtrl.pop()
        });
      } else {
        this.events.publish('refresh:placetypes');
        this.navCtrl.pop();
      }
    });
  }
}
