import {Component} from '@angular/core';
import {App, Button, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {TranslateService} from "@ngx-translate/core";
import {NgForm} from "@angular/forms";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    private app: App,
    private auth: AuthProvider,
    private translate: TranslateService,
    private globalConfig: GlobalConfigsService,
    private toastCtrl: ToastController
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);

  }

  signUpMe(form: NgForm, button: Button) {
    button.getNativeElement().disabled = true;
    this.auth.registration({
      name: this.name, surname: this.surname, email: this.email,
      login: this.login, password: this.password
    }).subscribe(() => {
      // this.message = 'Please check your email, and sign in!';

      this.translate.get('signUp.toast').subscribe((message) => {
        this.toastCtrl.create({position: 'top', duration: 3000, message}).present();
        form.resetForm();
        button.getNativeElement().disabled = false;
      });

    }, (error) => {
      console.log(error);
    });
  }
}
