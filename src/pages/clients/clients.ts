import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, MenuController, NavController, NavParams, Refresher} from 'ionic-angular';
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

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientProvider,
    private menuController: MenuController
  ) {
  }

  ngOnInit() {
    this.loadClients()
      .subscribe(clients => this.clients = clients)
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;


    this.loadClients()
      .subscribe(clients => {
        this.clients = clients;
        refresher.complete();
      })
  }

  loadClients() {
    return this.clientService
      .find({
        skip: this.skip,
        limit: this.limit
      });
  }

  toProfile(client: Client) {
    this.menuController.close();
    this.navCtrl.push(ProfilePage, client);
  }

  loadNextClientsPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadClients()
        .subscribe((clients) => {
          if (clients.length < this.pageSize) this.allLoaded = true;
          this.clients.push(...clients);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }
}
