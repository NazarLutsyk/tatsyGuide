import {Component, OnInit} from '@angular/core';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {AllPlacesPage} from "../all-places/all-places";
import {TopPlacesPage} from "../top-places/top-places";
import {AllNewsPage} from "../all-news/all-news";
import {AllDrinkApplicationsPage} from "../all-drink-applications/all-drink-applications";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  placesTab = AllPlacesPage;
  topPlacesTab = TopPlacesPage;
  newsTab = AllNewsPage;
  drinkerTab = AllDrinkApplicationsPage;


  constructor() {}
  ngOnInit(): void {
  }


  // places: Place[] = [];
  // globalHost: string;
  // principal: Client;
  //
  //
  // constructor(
  //   private http: HttpClient,
  //   private globalVars: GlobalConfigsService,
  //   public navCtrl: NavController,
  //   private navParams: NavParams,
  //   private placesService: PlacesProvider,
  //   private geolocation: Geolocation,
  //   private clientService: ClientProvider,
  //   private bonuseService: BonuseProvider,
  //   private events: Events,
  //   private auth: AuthProvider,
  //   private placeMultilangService: PlaceMultilangProvider,
  //   platform: Platform,
  // ) {
  //   this.globalHost = globalVars.getGlobalHost();
  //   this.events.subscribe('functionCall:find', (eventData) => {
  //     let filter: any = {};
  //     let sort: any = {};
  //     if (eventData.placeType) {
  //       filter.types = eventData.placeType;
  //     }
  //     for (const feature in eventData.filterFeature) {
  //       if (!eventData.filterFeature[feature]) delete eventData.filterFeature[feature];
  //       filter['features.' + feature] = eventData.filterFeature[feature];
  //     }
  //     if (!ObjectUtils.isEmpty(eventData.range)) {
  //       filter.averagePrice = {$gte: eventData.range.lower, $lte: eventData.range.upper};
  //     }
  //     if (eventData.sort === 'rating' || eventData.sort === 'averagePrice' || eventData.sort === 'name') {
  //       sort[eventData.sort] = eventData.direction ? 1 : -1
  //     }
  //     let res;
  //
  //     if (sort.name) {
  //       res = placeMultilangService.find({
  //         query: {lang: this.globalVars.getGlobalLang()},
  //         sort: sort,
  //         populate: [
  //           {
  //             path: 'place',
  //             match: filter,
  //             populate: [
  //               {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
  //               {
  //                 path: 'types',
  //                 populate: {
  //                   match: {lang: this.globalVars.getGlobalLang()},
  //                   path: 'multilang'
  //                 }
  //               }
  //             ]
  //           },
  //         ]
  //       }).map((placesM) => {
  //         return placesM
  //           .filter(pm => pm.place !== null)
  //           .map(pm => {
  //             return pm.place;
  //           });
  //       });
  //
  //     } else {
  //       let target = {
  //         query: filter,
  //         sort: sort,
  //         populate: [
  //           {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
  //           {
  //             path: 'types',
  //             populate: {
  //               match: {lang: this.globalVars.getGlobalLang()},
  //               path: 'multilang'
  //             }
  //           }]
  //       };
  //       res = this.placesService.find(target);
  //     }
  //     zip(
  //       fromPromise(this.geolocation.getCurrentPosition()),
  //       res
  //     ).subscribe(([position, places]) => {
  //       this.places = places;
  //       for (const place of this.places) {
  //         place.distance = this.placesService.findDistance(position, place);
  //       }
  //       if (eventData.sort === 'location') {
  //         this.places = this.places.sort((a, b) => {
  //           if (eventData.direction > 0)
  //             return a.distance - b.distance;
  //           else {
  //             return b.distance - a.distance;
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
  //
  // ngOnInit() {
  //   this.auth.principal.subscribe(principal => this.principal = principal);
  //   this.auth.loadPrincipal().subscribe();
  //   this.placesService
  //     .find(
  //       {
  //         populate: [
  //           {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
  //           {
  //             path: 'types',
  //             populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
  //           },
  //         ]
  //       }
  //     )
  //     .subscribe(places => {
  //       this.places = places
  //     });
  // }
  //
  // toDetails(place) {
  //   this.placesService
  //     .findOne(
  //       place._id,
  //       {
  //         populate: [
  //           {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
  //           {
  //             path: 'types',
  //             populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
  //           },
  //         ]
  //       }
  //     )
  //     .subscribe((foundedPlace) => {
  //       this.navCtrl.push(PlaceDeatilsPage, foundedPlace);
  //     });
  // }
  //
  // doRefresh(refresher: Refresher) {
  //   this.placesService
  //     .find(
  //       {
  //         populate: [
  //           {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
  //           {
  //             path: 'types',
  //             populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
  //           },
  //         ]
  //       }
  //     )
  //     .subscribe((places) => {
  //       this.places = places;
  //       refresher.complete();
  //       ;
  //     });
  // }
  //
  // onSearchPlaces(event) {
  //   setTimeout(() => {
  //     this.searchPlaces(event.target.value);
  //   }, 500);
  // }
  //
  // searchPlaces(value: string) {
  //   this.placeMultilangService
  //     .find(
  //       {
  //         query: {
  //           lang: this.globalVars.getGlobalLang(),
  //           name: {$regex: value, $options: "i"}
  //         },
  //         select: {
  //           _id: 1,
  //           place: 1
  //         }
  //       },
  //     )
  //     .subscribe(placeMultilangs => {
  //       let pIds = placeMultilangs.map(pm => pm.place);
  //       this.placesService.find({
  //         query: {_id: pIds},
  //         populate: [
  //           {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
  //           {
  //             path: 'types',
  //             populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
  //           },
  //         ]
  //       })
  //         .subscribe((places) => {
  //           this.places = places;
  //         })
  //     });
  //
  // }
}
