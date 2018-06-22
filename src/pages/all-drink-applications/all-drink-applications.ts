import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {Observable} from "rxjs/Observable";
import {UpdateDrinkApplicationPage} from "../update-drink-application/update-drink-application";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {SingleDrinkApplicationPage} from "../single-drink-application/single-drink-application";
import {AuthProvider} from "../../providers/auth/auth";


@IonicPage()
@Component({
  selector: 'page-all-drink-applications',
  templateUrl: 'all-drink-applications.html',
})
export class AllDrinkApplicationsPage {

  principal;
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
    private drinkAppsService: DrinkApplicationProvider,
    private auth: AuthProvider
  ) {
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      let skip;
      let limit;
      if (!principal) {
        this.allLoaded = true;
        skip = 0;
        limit = 5;
      }
      this.loadDrinkApps(skip, limit).subscribe((apps) => {
        this.drinkApps = apps;
      });
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

  // goToCreateDrinkerApplication() {
  //   this.app.getRootNav().push(DrinkerApplicationPage, {disabled: false});
  // }

  private loadDrinkApps(skip?: number, limit?: number): Observable<any> {
    return this.drinkAppsService.find({
      aggregate: [
        {
          $lookup: {
            from: 'clients',
            localField: 'organizer',
            foreignField: '_id',
            as: 'organizer',
          }
        },
        {$unwind: "$organizer"},
        {
          $lookup: {
            from: 'multilangs',
            localField: 'place',
            foreignField: 'place',
            as: 'place',
          }
        },
        {$unwind: "$place"},
        {$match: {'place.lang': this.gc.getGlobalLang()}},
        {$sort: {createdAt: -1}},
        {$skip: skip || this.skip},
        {$limit: limit || this.limit},
      ]
    })
  }

  removeDrinkApp(drinkApp: any) {
    this.drinkAppsService.remove(drinkApp._id).subscribe();
    this.drinkApps.splice(this.drinkApps.indexOf(drinkApp), 1);
  }

  updateDrinkApp(drinkApp: any) {
    this.app.getRootNav().push(UpdateDrinkApplicationPage, {drinkApp: drinkApp});
  }

  loadNextApplicationsPage(event: InfiniteScroll) {
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

  openDrinkApplication(drinkApp: DrinkApplication) {
    this.app.getRootNav().push(SingleDrinkApplicationPage, {showPlaceInfo: true});
  }
}
