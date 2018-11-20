import {Component, Renderer2} from '@angular/core';
import {
  AlertController,
  App,
  Events,
  InfiniteScroll,
  IonicPage,
  NavController,
  NavParams,
  Refresher
} from 'ionic-angular';
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {Observable} from "rxjs/Observable";
import {UpdateDrinkApplicationPage} from "../update-drink-application/update-drink-application";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {SingleDrinkApplicationPage} from "../single-drink-application/single-drink-application";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-all-drink-applications',
  templateUrl: 'all-drink-applications.html',
})
export class AllDrinkApplicationsPage {

  principal;
  drinkApps: DrinkApplication[];
  searchDrinkAppId;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;
  eventData: any = {
    city: ''
  };
  placeQuery: any = {
    query: {}
  };
  drinkAppQuery: any = {
    query: {}
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private gc: GlobalConfigsService,
    private drinkAppsService: DrinkApplicationProvider,
    private auth: AuthProvider,
    private events: Events,
    private renderer: Renderer2,
    private storage: Storage,
    private alertController: AlertController,
    private translate: TranslateService
  ) {

    this.storage.get('firstStart').then((isFirst) => {
      if (!isFirst) {
        this.storage.set('firstStart', true);
        this.translate.get(['drinkApplicationToast.faq', 'drinkApplicationToast.faqHeader']).subscribe((trans) => {
          let drinkerGuideAlert = this.alertController.create(
            {
              enableBackdropDismiss: true,
              title: trans['drinkApplicationToast.faqHeader'],
              message: trans['drinkApplicationToast.faq']
            }
          );
          drinkerGuideAlert.present();
        });
      }
    });

  }

  ngOnInit() {
    this.renderer.removeClass(document.getElementById('tab-t0-3'), 'pulse');


    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.loadDrinkApps().subscribe((apps) => {
        this.drinkApps = apps;
        this.events.subscribe('functionCall:findDrinkApps', (eventData) => {
          this.skip = 0;
          this.allLoaded = false;
          this.eventData = eventData;
          this.loadDrinkApps(eventData).subscribe(drinkApps => this.drinkApps = drinkApps);
        });

      });
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadDrinkApps(this.eventData)
      .subscribe((apps) => {
        this.drinkApps = apps;
        refresher.complete();
      });
  }

  private prepareQuery(dataQuery: { city: string }) {
    this.placeQuery = {
      query: {}
    };
    this.drinkAppQuery = {
      query: {}
    };

    if (dataQuery.city) {
      this.placeQuery.query['place.city'] = dataQuery.city;
    }
    if (this.searchDrinkAppId) {
      this.drinkAppQuery.query._id = this.searchDrinkAppId;
    }
  }

  private loadDrinkApps(eventData = {city: ''}): Observable<any> {
    this.prepareQuery(eventData);

    return this.drinkAppsService.find({
      aggregate: [
        {
          $match: {...this.drinkAppQuery.query}
        },
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
            as: 'placeM',
          }
        },
        {$unwind: "$placeM"},
        {
          $match: {
            'placeM.lang': this.gc.getGlobalLang(),
          }
        },
        {
          $lookup: {
            from: 'places',
            localField: 'place',
            foreignField: '_id',
            as: 'place',
          }
        },
        {$unwind: "$place"},
        {
          $match: {
            ...this.placeQuery.query
          }
        },
        {$sort: {createdAt: -1}},
        {$skip: this.skip},
        {$limit: this.limit},
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
      this.loadDrinkApps(this.eventData)
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
    this.app.getRootNav().push(SingleDrinkApplicationPage, {showPlaceInfo: true, _id: (<any>drinkApp)._id});
  }

  goToSelectPlacePage() {
    this.navCtrl.parent.select(1);
    this.events.publish('click-drink-app-create');
  }

  onSearchDrinkApp(event) {
    this.skip = 0;
    this.allLoaded = false;
    let searchStrInput = event.target.value || '';
    this.searchDrinkAppId = searchStrInput.trim();
    this.loadDrinkApps(this.eventData).subscribe(dapps => this.drinkApps = dapps);
  }

}
