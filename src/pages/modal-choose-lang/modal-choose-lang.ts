import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {LangProvider} from "../../providers/lang/lang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-modal-choose-lang',
  templateUrl: 'modal-choose-lang.html',
})
export class ModalChooseLangPage {

  langs = [];
  lang: string;

  constructor(
    public viewController: ViewController,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private langService: LangProvider,
    private globalConfig: GlobalConfigsService,
    public translate: TranslateService
) {
  // this.translate.setDefaultLang("en");
  // this.translate.use(this.globalConfig.deviceLang);
}

  ngOnInit() {
    this.langService.find({}).subscribe(langs => {
      this.langs = langs;
      this.lang = this.globalConfig.getGlobalLang();
    });
  }

  goToUpdate(lang) {
    let data = this.navParams.data;
    this.viewController.dismiss();
    this.lang = lang;
    this.app.getRootNav().push(data.page, {object: data.object, choosenLang: this.lang});
  }


  pop(){
    this.navCtrl.pop();
  }
}
