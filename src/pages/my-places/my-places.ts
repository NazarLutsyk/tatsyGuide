import {Component} from '@angular/core';
import {Events, InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {AuthProvider} from "../../providers/auth/auth";
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {HttpClient} from "@angular/common/http";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {Observable} from "rxjs/Observable";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {LangProvider} from "../../providers/lang/lang";


@IonicPage()
@Component({
  selector: 'page-my-places',
  templateUrl: 'my-places.html',
})
export class MyPlacesPage {


  places: Place[] = [];
  globalHost: string;
  principal: Client;
  langs = [];
  selectedLang = '';

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    public navCtrl: NavController,
    private navParams: NavParams,
    private placesService: PlacesProvider,
    private clientService: ClientProvider,
    private bonuseService: BonuseProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private events: Events,
    private auth: AuthProvider,
    private departmentService: DepartmentProvider,
    private globalConfig: GlobalConfigsService,
    private langsService: LangProvider
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
    this.globalHost = globalVars.getGlobalHost();
  }

  ngOnInit() {
    this.selectedLang = this.globalConfig.getGlobalLang();
    this.langsService.find({}).subscribe(langs => this.langs = langs);

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
      if (this.navParams.data.client) {
        this.makeRequest(this.navParams.data.client).subscribe((places) => {
          subscriber.next(places);
        })
      } else {
        this.auth.loadPrincipal().subscribe((principal) => {
          this.principal = principal;
          this.makeRequest(this.principal).subscribe((places) => {
            subscriber.next(places);
          })
        });
      }
    })
  }

  makeRequest(client) {
    return this.placesService.find({
      aggregate: [
        {
          $lookup: {
            from: 'multilangs',
            localField: '_id',
            foreignField: 'place',
            as: 'multilang',
          }
        },
        {$unwind: "$multilang"},
        {
          $lookup: {
            from: 'multilangs',
            localField: 'types',
            foreignField: 'placeType',
            as: 'types',
          }
        },
        {$unwind: "$types"},
        {
          $match: {
            'types.lang': this.selectedLang,
            'multilang.lang': this.selectedLang
          }
        },
        {
          $lookup: {
            from: 'multilangs',
            localField: 'city',
            foreignField: 'city',
            as: 'city',
          }
        },
        {$unwind: "$city"},
        {
          $match: {
            'city.lang': this.selectedLang,
            'multilang.lang': this.selectedLang
          }
        },
        {
          $lookup: {
            from: 'departments',
            localField: '_id',
            foreignField: 'place',
            as: 'departments',
          }
        },
        {$unwind: "$departments"},
        {
          $match: {
            'departments.client': client._id,
          }
        },
        {
          $group: {
            _id: '$_id',
            types: {$push: '$types'},
            multilang: {$addToSet: '$multilang'},
            phone: {$first: '$phone'},
            email: {$first: '$email'},
            averagePrice: {$first: '$averagePrice'},
            reviews: {$first: '$reviews'},
            rating: {$first: '$rating'},
            allowed: {$first: '$allowed'},
            avatar: {$first: '$avatar'},
            location: {$first: '$location'},
            // features: {$first: '$features'},
            topCategories: {$first: '$topCategories'},
            images: {$first: '$images'},
            days: {$first: '$days'},
            hashTags: {$first: '$hashTags'},
            city: {$first: '$city'},
          }
        },
        {$skip: this.skip},
        {$limit: this.limit},
      ]
    })

  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, {id: place._id, preferredLanguage: this.selectedLang});
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

  changeLang() {
    this.loadOwnPlaces().subscribe(places => this.places = places);
  }
}
