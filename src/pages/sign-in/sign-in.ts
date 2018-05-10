import {Component} from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {HomePage} from "../home/home";

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
    private events: Events
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signInMe() {
    var obj = {login: this.login, password: this.password};

    this.http.post(`${this.globalVars.getGlobalHost()}/auth/local/signin`, obj, {observe: 'response'}).subscribe((response) => {
        if (response) {
          this.http.get(`${this.globalVars.getGlobalHost()}/auth/principal`).subscribe(principal => {
            console.log("principal in sign in", principal);

          });
          this.events.publish("changeAuthState", true);
          this.app.getRootNav().setRoot(HomePage);

        }

      },
      error => {
        console.log("error during logination");
        this.message = "wrong login or password";

      }
    );


  }


}
