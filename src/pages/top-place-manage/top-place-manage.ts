import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {TopPlaceProvider} from "../../providers/top-place/top-place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopPlaceUpdatePage} from "../top-place-update/top-place-update";


@IonicPage()
@Component({
  selector: 'page-top-place-manage',
  templateUrl: 'top-place-manage.html',
})
export class TopPlaceManagePage {

  topPlaces: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private topPlaceService: TopPlaceProvider,
    private globalVars: GlobalConfigsService
  ) {
  }

  ngOnInit() {
    this.loadTopPlaces()
      .subscribe(topPlaces => this.topPlaces = topPlaces);
  }

  doRefresh(refresher: Refresher) {
    this.loadTopPlaces()
      .subscribe(topPlaces => {
        this.topPlaces = topPlaces;
        refresher.complete();
      });
  }

  loadTopPlaces() {
    return this.topPlaceService.find({
      populate: [
        {
          path: 'place',
          populate: [
            {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
          ]

        }
      ]
    });
  }


  updateTopPlace(topPlace) {
    this.navCtrl.push(TopPlaceUpdatePage, topPlace);
  }

  removeTopPlace(topPlace) {
    this.topPlaceService.remove(topPlace._id).subscribe(() => {
      this.topPlaces.splice(this.topPlaces.indexOf(topPlace, 1));
    });
  }
}
