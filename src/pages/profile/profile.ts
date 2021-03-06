import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Client} from "../../models/client/Client";
import {UpdateProfilePage} from "../update-profile/update-profile";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {ObjectUtils} from "../../utils/ObjectUtils";
import {TranslateService} from "@ngx-translate/core";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {MyPlacesPage} from "../my-places/my-places";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: Client = new Client();
  principal: Client = new Client();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private clientService: ClientProvider,
    private app: App,
    private translate: TranslateService,
    private alert: AlertController,
    private globalConfig: GlobalConfigsService,
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    if (!ObjectUtils.isEmpty(this.navParams.data)) {
      this.client = this.navParams.data;
    }
    this.auth.loadPrincipal().subscribe(client => {
      if (!this.client._id) {
        this.client = client;
      }
      this.principal = client
    });
  }

  updateClient(client) {
    this.app.getRootNav().push(UpdateProfilePage, {client: client});
  }

  removeClient(client) {
    event.stopPropagation();
    this.translate.get([
        'placeInfo.delete',
        'placeInfo.confirm',
        'placeInfo.cancel',
      ]
    ).subscribe(translations => {


      let alertWindow = this.alert.create({
        enableBackdropDismiss: true,
        title: translations['placeInfo.delete'] + "?",
        buttons: [
          {
            text: translations['placeInfo.confirm'],
            handler: () => {
              event.stopPropagation();
              if (this.principal._id === this.client._id) {
                this.auth.principal.next(null);
              }
              this.clientService.remove(client._id).subscribe(() => {
                this.navCtrl.goToRoot({});
              })
            }
          },
          {
            text: translations['placeInfo.cancel']
          }
        ]
      });
      alertWindow.present();
    });
  }

  goToClientPlacesPage() {
    this.app.getRootNav().push(MyPlacesPage, {client: this.client});
  }
}
