import {Component, OnInit} from '@angular/core';
import {AllPlacesPage} from "../all-places/all-places";
import {TopPlacesPage} from "../top-places/top-places";
import {AllNewsPage} from "../all-news/all-news";
import {AllDrinkApplicationsPage} from "../all-drink-applications/all-drink-applications";
import {TranslateService} from "@ngx-translate/core";
import {Events, ModalController, ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {PopoverPage} from "../popover/popover";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  placesTab = AllPlacesPage;
  topPlacesTab = TopPlacesPage;
  newsTab = AllNewsPage;
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

}

