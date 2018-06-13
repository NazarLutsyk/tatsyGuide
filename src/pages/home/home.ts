import {Component, OnInit} from '@angular/core';
import {AllPlacesPage} from "../all-places/all-places";
import {TopPlacesPage} from "../top-places/top-places";
import {AllNewsPage} from "../all-news/all-news";
import {AllDrinkApplicationsPage} from "../all-drink-applications/all-drink-applications";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  placesTab = AllPlacesPage;
  topPlacesTab = TopPlacesPage;
  newsTab = AllNewsPage;
  drinkerTab = AllDrinkApplicationsPage;


  constructor(translate: TranslateService) {
    translate.setDefaultLang('ua');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
  }

}
