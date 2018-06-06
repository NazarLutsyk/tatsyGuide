import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {LangProvider} from "../../providers/lang/lang";

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
    private langService: LangProvider
  ) {
  }

  ngOnInit() {
    this.langService.find({}).subscribe(langs => this.langs = langs);
  }

  goToUpdate() {
    let data = this.navParams.data;
    this.viewController.dismiss();
    this.app.getRootNav().push(data.page, {object: data.object, choosenLang: this.lang});
  }
}
