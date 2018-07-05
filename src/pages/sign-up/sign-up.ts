import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  name: string = "";
  surname: string = "";
  email: string = "";
  login: string = "";
  password: string = "";

  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    private app: App,
    private auth: AuthProvider,
    private translate: TranslateService,
    private globalConfig : GlobalConfigsService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);

  }

  signUpMe() {
    this.auth.registration({
      name: this.name, surname: this.surname, email: this.email,
      login: this.login, password: this.password
    }).subscribe(() => {
      this.message = 'Please check your email, and sign in!';
    }, (error) => {
      console.log(error);
    });
  }
}
