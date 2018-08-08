import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {LangProvider} from "../../providers/lang/lang";
import {TopCategoryProvider} from "../../providers/top-category/top-category";
import {TopCategoryMultilangProvider} from "../../providers/top-category-multilang/top-category-multilang";
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";

@IonicPage()
@Component({
  selector: 'page-create-top-category',
  templateUrl: 'create-top-category.html',
})
export class CreateTopCategoryPage {

  langs = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private langService: LangProvider,
    private topCategoryService: TopCategoryProvider,
    private topCategoryMultilangService: TopCategoryMultilangProvider,
    private events: Events,
  ) {
  }

  ngOnInit() {
    this.langs = this.globalConfig.langs;
  }

  createTopCategory(topCategoryForm: NgForm) {
    let topCategoryValueForm = topCategoryForm.form.value;
    this.topCategoryService.create({}).subscribe((topCategoryRes) => {
      let topCategoryId = topCategoryRes._id;
      let requests = [];
      for (const input in topCategoryValueForm) {
        let langId = input;
        let value = topCategoryValueForm[langId];
        let topCategoryM = {
          topCategory: topCategoryId,
          name: value,
          lang: langId
        };
        requests.push(this.topCategoryMultilangService.create(topCategoryM));
      }
      if (requests && requests.length > 0) {
        zip(...requests).subscribe(() => {
          this.events.publish('refresh:topcategories');
          this.navCtrl.pop()
        });
      } else {
        this.events.publish('refresh:topcategories');
        this.navCtrl.pop();
      }
    });
  }


}
