import {Component} from '@angular/core';
import {App, Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {HomePage} from "../home/home";
import {AuthProvider} from "../../providers/auth/auth";
import {Facebook} from "@ionic-native/facebook";
import {GooglePlus} from '@ionic-native/google-plus';
import {TranslateService} from "@ngx-translate/core";
import {RecoverPasspordPage} from "../recover-passpord/recover-passpord";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {


  login: string = "";
  password: string = "";
  errorDuringSignIn: boolean;

  constructor(
    private googlePlus: GooglePlus,
    private fb: Facebook,
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    private app: App,
    private events: Events,
    private auth: AuthProvider,
    private translate: TranslateService,
    private globalConfig: GlobalConfigsService,
    private modalCtrl: ModalController
  ) {
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isFacebookLoggedIn = true;
        } else {
          this.isFacebookLoggedIn = false;
        }
      })
      .catch(e => console.log(e));


  }


  signInMe() {
    var obj = {login: this.login, password: this.password};
    this.auth.logIn(obj).subscribe(() => {
      this.app.getRootNav().setRoot(HomePage);
    }, (error) => {
      console.log(error);
      this.errorDuringSignIn = true;

    });
  }


  /*facebook*/
  isFacebookLoggedIn: boolean = false;
  users: any;

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isFacebookLoggedIn = true;
          // this.getUserDetail(res.authResponse.userID);
          this.fb.getAccessToken().then(token => {
            console.log(token);
            this.auth.loginByFacebook(token).subscribe(value => {
              console.log('response login by facebook')
              console.log(value)
              this.app.getRootNav().setRoot(HomePage);
            });
          })
        } else {
          this.isFacebookLoggedIn = false;
        }

        // this.navCtrl.goToRoot({});
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*facebook*/


  /*google*/

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isGoogleLoggedIn: boolean = false;

  googleLogin() {
    this.googlePlus.login({
      'webClientId':'367749237931-ndqn6hdo8djbe8u1348vts0s5ovbede0.apps.googleusercontent.com',
      'offline': true
    })
      .then(res => {
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.isGoogleLoggedIn = true;
        this.auth.loginByGoolge(res.accessToken).subscribe(value => {
          console.log('response login by google');
          console.log(value);
          this.app.getRootNav().setRoot(HomePage);
        });
      })
      .catch(err => console.error(err));
  }

  goToRecoverPasswordPage() {
    let modal = this.modalCtrl.create(RecoverPasspordPage,{},{showBackdrop: true});
    modal.present();
  }
}
