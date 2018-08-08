import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {TopCategoryProvider} from "../../providers/top-category/top-category";
import {TopCategoryMultilangProvider} from "../../providers/top-category-multilang/top-category-multilang";

@IonicPage()
@Component({
  selector: 'page-update-top-category',
  templateUrl: 'update-top-category.html',
})
export class UpdateTopCategoryPage {

  createNewMultilang = false;
  objectToShow: any = {name: ''};

  topCategoryId = '';
  topCategoryMId = '';
  choosenLang = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private topCategoryService: TopCategoryProvider,
    private topCategoryMultilangService: TopCategoryMultilangProvider
  ) {
  }

  ngOnInit() {
    this.topCategoryId = this.navParams.data.object.topCategory;
    this.topCategoryMId = this.navParams.data.object._id;
    this.choosenLang = this.navParams.data.choosenLang;

    this.topCategoryMultilangService.find({
      query: {
        lang: this.choosenLang,
        topCategory: this.navParams.data.object.topCategory
      }
    }).subscribe(([ptm]) => {
      this.createNewMultilang = !(!!ptm);
      this.objectToShow = ptm ? ptm : {name: ''};
      this.topCategoryMId = ptm ? ptm._id : '';
    })
  }

  updateTopCategory(topCategoryForm: NgForm) {
    let topCategoryValueForm = topCategoryForm.form.value;
    let observable: Observable<any>;
    if (this.createNewMultilang) {
      let multilangToCreate = {
        name: topCategoryValueForm.name,
        lang: this.choosenLang,
        topCategory: this.topCategoryId
      };
      observable = this.topCategoryMultilangService.create(multilangToCreate);
    } else {
      observable = this.topCategoryMultilangService.update(this.topCategoryMId, topCategoryValueForm);
    }
    observable.subscribe(res => this.navCtrl.pop());
  }


}
