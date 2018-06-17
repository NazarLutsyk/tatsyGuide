import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {SignInPage} from "../sign-in/sign-in";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  signUp = SignUpPage;
  signIn = SignInPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private  translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
