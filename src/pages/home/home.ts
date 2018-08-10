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
    translate: TranslateService,
    public modal: ModalController,
    public storage: Storage,
    private events: Events,
    private toastController: ToastController
  ) {
  }

  ngOnInit(): void {
    //todo serj translate
    this.events.subscribe('click-drink-app-create', () => {
      let drinkerToast = this.toastController.create(
        {
          duration: 3000,
          message: 'Please, select place...',
          position: 'top'
        }
      );
      drinkerToast.present();
    });

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

