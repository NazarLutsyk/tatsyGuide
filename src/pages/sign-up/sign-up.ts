import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {zip} from "rxjs/observable/zip";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  name: string = "vaysa";
  surname: string = "pupkin";
  email: string = "vasya@vaysa.com";
  login: string = "vasya";
  password: string = "vaysa";

  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    private app: App,
    private storage: Storage
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUpMe() {
    console.log("signUpMe");
    var obj = {name: this.name, surname: this.surname, email: this.email, login: this.login, password: this.password};

    zip(this.http.post(`${this.globalVars.getGlobalHost()}/auth/local/signup`, obj)).subscribe(response => {


      console.log(response);
      if (response) {

        this.storage.set(`currentPrincipal`, JSON.stringify(response[0]));
        this.app.getRootNav().setRoot(HomePage);
      }

    }, error => {
      this.message = "user with this login already exist"

    })


  }


}
