import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PlaceTypeProvider} from "../../providers/place-type/place-type";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-create-place-type',
  templateUrl: 'create-place-type.html',
})
export class CreatePlaceTypePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private placeTypeService: PlaceTypeProvider,
    private placeTypeMultilangService: PlaceTypeMultilangProvider
  ) {
  }

  createPlaceType(placeTypeForm: NgForm) {
    let placeTypeFromForm = placeTypeForm.form.value;
    let placeTypeM = {
      placeType: '',
      name: placeTypeFromForm.name,
      lang: this.globalConfig.getGlobalLang()
    };
    this.placeTypeService.create({}).subscribe((placeTypeRes) => {
      placeTypeM.placeType = (<any>placeTypeRes)._id;
      this.placeTypeMultilangService.create(placeTypeM).subscribe((ptm) => {
        this.navCtrl.pop();
      })
    });
  }
}
