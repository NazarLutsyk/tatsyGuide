import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Client} from "../../models/client/Client";
import {UpdateProfilePage} from "../update-profile/update-profile";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {ObjectUtils} from "../../utils/ObjectUtils";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  principal: Client;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private clientService: ClientProvider,
    private app: App
  ) {
  }

  ngOnInit() {
    if (!ObjectUtils.isEmpty(this.navParams.data)) {
      this.principal = this.navParams.data;
    } else {
      this.auth.loadPrincipal().subscribe(principal => this.principal = principal);
    }
  }

  updateClient(client) {
    this.app.getRootNav().push(UpdateProfilePage, {client: client});
  }

  removeClient(principal) {
    this.clientService.remove(principal._id).subscribe(() => {
      this.navCtrl.goToRoot({});
    })
  }
}
