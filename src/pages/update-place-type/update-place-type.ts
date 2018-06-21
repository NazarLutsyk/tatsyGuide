import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlaceTypeProvider} from "../../providers/place-type/place-type";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-update-place-type',
  templateUrl: 'update-place-type.html',
})
export class UpdatePlaceTypePage {

  createNewMultilang = false;
  objectToShow: any = {name: ''};

  placeTypeId = '';
  placeTypeMId = '';
  choosenLang = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private placeTypeService: PlaceTypeProvider,
    private placeTypeMService: PlaceTypeMultilangProvider,
    private translate : TranslateService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  ngOnInit() {
    this.placeTypeId = this.navParams.data.object.placeType;
    this.placeTypeMId = this.navParams.data.object._id;
    this.choosenLang = this.navParams.data.choosenLang;

    this.placeTypeMService.find({
      query: {
        lang: this.choosenLang,
        placeType: this.navParams.data.object.placeType
      }
    }).subscribe(([ptm]) => {
      this.createNewMultilang = !(!!ptm);
      this.objectToShow = ptm ? ptm : {name: ''};
    })
  }

  updatePlaceType(ptForm: NgForm) {
    let objectFromForm = ptForm.form.value;
    let observable: Observable<any>;
    if (this.createNewMultilang) {
      let multilangToCreate = {
        name: objectFromForm.name,
        lang: this.choosenLang,
        placeType: this.placeTypeId
      };
      observable = this.placeTypeMService.create(multilangToCreate);
    } else {
      observable = this.placeTypeMService.update(this.placeTypeMId,objectFromForm);
    }
    observable.subscribe(res => this.navCtrl.pop());
  }

}
