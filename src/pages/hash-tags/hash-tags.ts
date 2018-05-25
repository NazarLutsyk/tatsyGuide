import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Searchbar} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-hash-tags',
  templateUrl: 'hash-tags.html',
})
export class HashTagsPage {

  globalHost: string;
  places: Place[];
  searchHashTag: string = '';
  @ViewChild('searchbar') searchbar: Searchbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placesService: PlacesProvider,
    private globalConfig: GlobalConfigsService
  ) {
  }

  ngOnInit(){
    this.globalHost = this.globalConfig.getGlobalHost();
    if (this.navParams.data.hashTag){
      this.searchHashTag = this.navParams.data.hashTag;
    }
    this.onSearchPlaces();
  }

  onSearchPlaces($event = {}) {
    let hashTags = this.searchHashTag.split(',');
    this.placesService
      .find(
        {
          query: {hashTags: {$in : hashTags}},
          populate: [
            {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
          ]
        }
      )
      .subscribe(places => {
        this.places = places
      });

  }
}
