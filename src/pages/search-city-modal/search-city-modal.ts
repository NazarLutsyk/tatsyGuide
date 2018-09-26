import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-city-modal',
  templateUrl: 'search-city-modal.html',
})
export class SearchCityModalPage {

  citiesM = [];
  filteredCitiesM = [];
  selectedCity = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.citiesM = this.navParams.data.citiesM;
    this.selectedCity = this.navParams.data.selectedCity;

    this.filteredCitiesM = this.citiesM;
  }

  cancel(cityId) {
    this.viewCtrl.dismiss(cityId);
  }

  onSearchCities($event: any) {
    let searchStrInput = $event.target.value.trim().toLowerCase() || '';
    if (searchStrInput.length > 0) {
      this.filteredCitiesM = this.citiesM.filter((value, index, arr) => {
        return value.name.toLowerCase().indexOf(searchStrInput) > -1;
      });
    }else {
      this.filteredCitiesM = this.citiesM;
    }
  }
}
