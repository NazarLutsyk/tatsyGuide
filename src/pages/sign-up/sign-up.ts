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

  message = '';

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
  }

  signUpMe(form: NgForm, button: Button) {
    button.getNativeElement().disabled = true;
    this.auth.registration({
      name: this.name, surname: this.surname, email: this.email,
      login: this.login, password: this.password
    }).subscribe(() => {

      this.translate.get('signUp.toast').subscribe((message) => {
        this.toastCtrl.create({position: 'top', duration: 3000, message}).present();
        this.message = '';
        form.resetForm();
        button.getNativeElement().disabled = false;
      });

    }, (error) => {
      this.translate.get('signUp.error').subscribe((trans) => {
        this.message = trans;
        setTimeout(() => {
          button.getNativeElement().disabled = false;
        }, 2000);
      })
    });
  }
}
