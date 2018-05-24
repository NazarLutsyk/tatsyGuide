import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Refresher} from 'ionic-angular';
import {Client} from "../../models/client/Client";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {ProfilePage} from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  clients: Client[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientProvider,
    private menuController: MenuController
  ) {
  }

  ngOnInit(){
    this.clientService
      .find({})
      .subscribe(clients => this.clients = clients)
  }

  doRefresh(refresher: Refresher){
    this.clientService
      .find({})
      .subscribe(clients => {
        this.clients = clients;
        refresher.complete();
      })
  }

  toProfile(client: Client) {
    this.menuController.close();
    this.navCtrl.push(ProfilePage, client);
  }
}
