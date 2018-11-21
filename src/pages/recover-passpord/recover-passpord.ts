import {Component} from '@angular/core';
import {Button, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {NgModel} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-recover-passpord',
  templateUrl: 'recover-passpord.html',
})
export class RecoverPasspordPage {


  step = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    private toast: ToastController,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.step = 0;
  }

  cancel() {
    this.navCtrl.pop();
  }

  sendCode(emailInput: NgModel, loginInput: NgModel, button: Button) {
    button.getNativeElement().disabled = true;
    let email = emailInput.value;
    let login = loginInput.value;
    this.authService.sendCode(email, login).subscribe((sended: boolean) => {
      if (sended) {
        this.step = 1;
        this.translate.get('recoverPass.alertCheckEmail').subscribe((message) => {
          this.toast.create({duration: 3000, position: 'top', message: message}).present();
        })
      } else {
        emailInput.control.setErrors({});
        loginInput.control.setErrors({});
      }
    })
  }

  verifyCode(codeInput: NgModel) {
    let code = codeInput.value;
    this.authService.verifyCode(code).subscribe((verified: boolean) => {
      if (verified) {
        this.step = 2;
      } else {
        codeInput.control.setErrors({})
      }
    });
  }

  changePassword(passwordInput: NgModel, loginInput: NgModel, emailInput: NgModel) {
    let password = passwordInput.value;
    let login = loginInput.value;
    let email = emailInput.value;
    this.authService.changePassword(login, email, password).subscribe((changed: boolean) => {
      if (changed) {
        this.step = 3;
        this.navCtrl.pop();
      } else {
        passwordInput.control.setErrors({})
      }
    });
  }
}
