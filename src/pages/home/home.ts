import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AllPlacesPage} from "../all-places/all-places";
import {TopPlacesPage} from "../top-places/top-places";
import {AllDrinkApplicationsPage} from "../all-drink-applications/all-drink-applications";
import {TranslateService} from "@ngx-translate/core";
import {AlertController, Events, ModalController, NavController, Tab, Tabs, ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {PopoverPage} from "../popover/popover";
import {AllPromosPage} from "../all-promos/all-promos";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('tabs') tabs: Tabs;

  placesTab = AllPlacesPage;
  topPlacesTab = TopPlacesPage;
  promosTab = AllPromosPage;
  drinkerTab = AllDrinkApplicationsPage;


  constructor(
    private translate: TranslateService,
    public modal: ModalController,
    public storage: Storage,
    private events: Events,
    private navCtrl: NavController,
    private alertController: AlertController,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.storage.get('firstStart').then((isFirst) => {
      if (!isFirst && document.getElementById('tab-t0-3')) {
        this.renderer.addClass(document.getElementById('tab-t0-3'), 'pulse');
      }
    });
  }

  handleChangeTab($event: Tab) {
    this.events.publish('changeTab', $event.index);
  }
}

