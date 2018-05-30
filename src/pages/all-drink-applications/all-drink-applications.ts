import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {DrinkerApplicationPage} from "../drinker-application/drinker-application";
import {Observable} from "rxjs/Observable";
import {UpdateDrinkApplicationPage} from "../update-drink-application/update-drink-application";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-all-drink-applications',
  templateUrl: 'all-drink-applications.html',
})
export class AllDrinkApplicationsPage {

  drinkApps: DrinkApplication[];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private gc: GlobalConfigsService,
    private drinkAppsService: DrinkApplicationProvider
  ) {
    this.loadDrinkApps().subscribe((apps) => {
      this.drinkApps = apps;
    });
  }


  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadDrinkApps()
      .subscribe((apps) => {
        this.drinkApps = apps;
        refresher.complete();
      });
  }

  goToCreateDrinkerApplication() {
    this.app.getRootNav().push(DrinkerApplicationPage, {disabled: false});
  }

  private loadDrinkApps(): Observable<any> {
    return this.drinkAppsService.find({
      sort: {createdAt: -1},
      populate: [
        {path: 'organizer'},
        {
          path: 'place',
          select: 'multilang',
          populate: [{
            path: 'multilang',
            match: {lang: this.gc.getGlobalLang()},
            select: 'name'
          }]
        }
      ],
      skip: this.skip,
      limit: this.limit
    });
  }

  removeDrinkApp(drinkApp: any) {
    this.drinkAppsService.remove(drinkApp._id).subscribe();
    this.drinkApps.splice(this.drinkApps.indexOf(drinkApp), 1);
  }

  updateDrinkApp(drinkApp: any) {
    this.app.getRootNav().push(UpdateDrinkApplicationPage, {drinkApp: drinkApp});
  }

  loadNextApplicationsPage(event: InfiniteScroll){
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadDrinkApps()
        .subscribe((drinkApps) => {
          if (drinkApps.length < this.pageSize) this.allLoaded = true;
          this.drinkApps.push(...drinkApps);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }
}
