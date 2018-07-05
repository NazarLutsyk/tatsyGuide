import {Component} from '@angular/core';
import {
  AlertController,
  InfiniteScroll,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Refresher
} from 'ionic-angular';
import {Client} from "../../models/client/Client";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Place} from "../../models/place/Place";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-client-places',
  templateUrl: 'client-places.html',
})
export class ClientPlacesPage {

  client = new Client();
  places = [];
  globalHost;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private departmentService: DepartmentProvider,
    private placesService: PlacesProvider,
    private loadingCtrl: LoadingController,
    private placeMultilangService: PlaceMultilangProvider,
    private translate: TranslateService,
    private alert: AlertController,
  ) {
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();
    this.client = typeof this.navParams.data === 'object' ? this.navParams.data : this.client;
    this.loadOwnPlaces().subscribe(places => {
      this.places = places;
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadOwnPlaces().subscribe((places) => {
      this.places = places;
      refresher.complete();
    });
  }

  loadOwnPlaces() {
    return new Observable<Place[]>((subscriber) => {
      this.departmentService
        .find({
          query: {client: (<any>this.client)._id, roles: 'BOSS_PLACE'},
        })
        .subscribe((departments) => {
          let placeIds = departments.map(dep => dep.place);
          this.placesService.find({
            query: {_id: placeIds},
            populate: [
              {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
              {
                path: 'types',
                populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
              }
            ],
            skip: this.skip,
            limit: this.limit
          })
            .subscribe(places => {
              let okPlaces = [];
              let otherPlacesIds = [];
              for (const place of places) {
                if (!place.multilang || place.multilang.length === 0) {
                  otherPlacesIds.push(place._id);
                } else {
                  okPlaces.push(place);
                }
              }
              if (otherPlacesIds.length > 0) {
                this.placesService.find({
                  query: {_id: {$in: otherPlacesIds}},
                  populate: [
                    {path: 'multilang'},
                    {
                      path: 'types',
                      populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
                    }
                  ],
                  $project: {
                    multilang: {$arrayElemAt: ["$multilang", 0]},
                    types: 1,
                    rating: 1,
                  },
                  skip: this.skip,
                  limit: this.limit
                }).subscribe((places) => {
                  okPlaces.push(...places);
                  subscriber.next(okPlaces);
                });
              } else {
                subscriber.next(okPlaces);
              }
            });
        });
    })
  }

  toDetails(place) {
    let spinner = this.loadingCtrl.create({
      dismissOnPageChange: true,
      enableBackdropDismiss: true
    });
    spinner.present();
    let placesSubscriber = this.placesService
      .find(
        {
          query: {_id: place._id},
          populate: [
            {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            }
          ]
        }
      )
      .subscribe((foundedPlace) => {
        let place = foundedPlace[0];
        if (!place.multilang || place.multilang.length === 0) {
          this.placeMultilangService.find({
            query: {place: place._id},
            limit: 1
          }).subscribe((pm) => {
            place.multilang = pm;
            this.navCtrl.push(PlaceDeatilsPage, place);
          })
        } else {
          this.navCtrl.push(PlaceDeatilsPage, place);
        }
      });
    spinner.onWillDismiss(() => {
      placesSubscriber.unsubscribe();
    });
  }


  removePlace(place, event) {

    event.stopPropagation();
    this.translate.get([
        'placeInfo.delete',
        'placeInfo.confirm',
        'placeInfo.cancel',
      ]
    ).subscribe(translations => {

      event.stopPropagation();

      let alertWindow = this.alert.create({
        enableBackdropDismiss: true,
        title: translations['placeInfo.delete'] + "?",
        buttons: [
          {
            text: translations['placeInfo.confirm'],
            handler: () => {

              // event.stopPropagation();
              // this.onRemoveDrinkApplication.emit(this.drinkApp);

              this.places.splice(this.places.indexOf(place), 1);
              this.placesService.remove(place._id).subscribe();

            }
          },
          {
            text: translations['placeInfo.cancel']
          }
        ]

      });

      alertWindow.present();
    });

  }

  loadNextPlacesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadOwnPlaces()
        .subscribe((places) => {
          if (places.length < this.pageSize) this.allLoaded = true;
          this.places.push(...places);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }

}
