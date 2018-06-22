import {Component, OnInit} from '@angular/core';
import {AllPlacesPage} from "../all-places/all-places";
import {TopPlacesPage} from "../top-places/top-places";
import {AllNewsPage} from "../all-news/all-news";
import {AllDrinkApplicationsPage} from "../all-drink-applications/all-drink-applications";
import {TranslateService} from "@ngx-translate/core";
import {ModalController} from "ionic-angular";
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
    public storage: Storage
  ) {
    translate.setDefaultLang('ua');

    translate.use('en');
  }

  ngOnInit(): void {
    this.storage.get('initialpopover').then((show) => {
      if (show) {
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
