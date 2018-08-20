import {Component, OnInit} from '@angular/core';
import {AllPlacesPage} from "../all-places/all-places";
import {TopPlacesPage} from "../top-places/top-places";
import {AllDrinkApplicationsPage} from "../all-drink-applications/all-drink-applications";
import {TranslateService} from "@ngx-translate/core";
import {Events, ModalController, Tab, ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {PopoverPage} from "../popover/popover";
import {AllPromosPage} from "../all-promos/all-promos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  placesTab = AllPlacesPage;
  topPlacesTab = TopPlacesPage;
  promosTab = AllPromosPage;
  drinkerTab = AllDrinkApplicationsPage;


  constructor(
    private translate: TranslateService,
    public modal: ModalController,
    public storage: Storage,
    private events: Events,
  ) {
  }

  ngOnInit(): void {
    this.storage.get('initialpopover').then((show) => {
      if (show || show === null) {
        let modalPage = this.modal.create(
          PopoverPage,
          {},
          {enableBackdropDismiss: false, showBackdrop: false}
        );
        modalPage.present();
      }
    });
  }

  handleChangeTab($event: Tab) {
    this.events.publish('changeTab', $event.index);
  }
}

