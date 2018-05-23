import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Client} from "../../models/client/Client";
import {UpdateEventPage} from "../update-event/update-event";
import {UpdateProfilePage} from "../update-profile/update-profile";
import {zip} from "rxjs/observable/zip";
import {ClientProvider} from "../../providers/client/ClientProvider";

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
    this.auth.loadPrincipal().subscribe(principal => this.principal = principal);
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
