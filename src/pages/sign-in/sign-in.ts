import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";
import {Client} from "../../models/client/Client";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

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
    console.log('ionViewDidLoad SignInPage');
  }

  signInMe() {
    var obj = {login: this.login, password: this.password};


    // zip(this.http.post<Client[]>(`${this.globalVars.getGlobalHost()}/auth/local/signin`, obj)).subscribe((users) => {
    //     let user = users[0];
    //     if (user) {
    //       this.app.getRootNav().setRoot(HomePage);
    //       this.storage.set(`currentPrincipal`, JSON.stringify(obj));
    //     }
    //
    //   },
    //   error => {
    //     this.message = "wrong login or password";
    //
    //   }
    // );

    this.http.post(`${this.globalVars.getGlobalHost()}/auth/local/signin`, obj,{ observe: 'response'}).subscribe((response) => {
        if (response) {
          this.http.get(`${this.globalVars.getGlobalHost()}/auth/principal`).subscribe(value => {
            console.log(value);
            console.log('SAVE');
            this.storage.set(`currentPrincipal`, JSON.stringify(value));


          });
          this.app.getRootNav().setRoot(HomePage);
        }

      },
      error => {
        this.message = "wrong login or password";

      }
    );


  }


}
