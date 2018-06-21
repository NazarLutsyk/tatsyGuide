import {Component} from '@angular/core';
import {Events, InfiniteScroll, IonicPage, MenuController, NavController, NavParams, Refresher} from 'ionic-angular';
import {Client} from "../../models/client/Client";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {ProfilePage} from "../profile/profile";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  getId = false;
  clients: Client[];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientProvider,
    private menuController: MenuController,
    private events: Events,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  ngOnInit() {
    this.getId = typeof this.navParams.data.getId === 'boolean' ? this.navParams.data.getId : false;
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
    if (this.getId) {
      this.events.publish('select:administrator', client);
      this.navCtrl.pop();
    } else {
      this.menuController.close();
      this.navCtrl.push(ProfilePage, client);
    }
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

  onSearchClients(event) {
    this.skip = 0;
    this.allLoaded = false;
    setTimeout(() => {
      let searchStr = event.target.value;
      this.clientService.find({
        query: {
          $or: [
            {name: {$regex: searchStr, $options: "i"}},
            {surname: {$regex: searchStr, $options: "i"}}
          ]
        },
        skip: this.skip,
        limit: this.limit
      }).subscribe(clients => {
        this.clients = clients;
      });
    }, 500);
  }
}
