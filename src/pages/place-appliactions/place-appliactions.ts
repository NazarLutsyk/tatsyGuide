import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {DrinkerApplicationPage} from "../drinker-application/drinker-application";
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {Observable} from "rxjs/Observable";
import {UpdateDrinkApplicationPage} from "../update-drink-application/update-drink-application";

@IonicPage()
@Component({
  selector: 'page-place-appliactions',
  templateUrl: 'place-appliactions.html',
})
export class PlaceAppliactionsPage {

  place: Place;
  drinkApps: DrinkApplication[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private drinkAppsService: DrinkApplicationProvider
  ) {
    this.place = navParams.data;
    this.loadDrinkApps().subscribe((apps) => {
      this.drinkApps = apps;
    });
  }

  doRefresh(refresher: Refresher) {
    this.loadDrinkApps()
      .subscribe((apps) => {
        this.drinkApps = apps;
        refresher.complete();
      });
  }

  goToCreateDrinkerApplication(place) {
    this.app.getRootNav().push(DrinkerApplicationPage, {place, disabled: true});
  }

  private loadDrinkApps(): Observable<any> {
    return this.drinkAppsService.find({
      query: {place: this.navParams.data._id},
      populate: [{path: 'organizer'}]
    })
  }

  removeDrinkApp(drinkApp: any) {
    this.drinkAppsService.remove(drinkApp._id).subscribe();
    this.drinkApps.splice(this.drinkApps.indexOf(drinkApp, 1));
  }


  updateDrinkApp(drinkApp: any) {
    this.app.getRootNav().push(UpdateDrinkApplicationPage, {drinkApp: drinkApp});
  }
}
