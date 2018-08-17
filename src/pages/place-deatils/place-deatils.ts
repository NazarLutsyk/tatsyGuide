import {Component} from '@angular/core';
import {LoadingController, MenuController, NavController, NavParams, Platform} from 'ionic-angular';

import {GoogleMap} from '@ionic-native/google-maps';
import {Place} from "../../models/place/Place";
import {PlaceInfoPage} from "../place-info/place-info";
import {AuthProvider} from "../../providers/auth/auth";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {BonusePage} from "../bonuse/bonuse";
import {NewsPage} from "../news/news";
import {EventPage} from "../event/event";
import {MapPage} from "../map/map";
import {TestimonialPage} from "../testimonial/testimonial";
import {PlaceAppliactionsPage} from "../place-appliactions/place-appliactions";
import {PlaceStatisticPage} from "../place-statistic/place-statistic";
import {TranslateService} from "@ngx-translate/core";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";


@Component({
  selector: 'page-place-deatils',
  templateUrl: 'place-deatils.html',
  styles: ['place-details.scss']
})
export class PlaceDeatilsPage {
  isFavorite: boolean = false;
  place: Place;
  map: GoogleMap;
  globalHost: string;
  placeInfoPage = PlaceInfoPage;
  bonusesPage = BonusePage;
  eventsPage = EventPage;
  newsPage = NewsPage;
  mapPage = MapPage;
  testimonialsPage = TestimonialPage;
  drinkerPage = PlaceAppliactionsPage;
  placeStatisticPage = PlaceStatisticPage;
  principal;
  departments;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              platform: Platform,
              private menuController: MenuController,
              // private storage: Storage,
              private auth: AuthProvider,
              private clientService: ClientProvider,
              private departmentService: DepartmentProvider,
              public translate: TranslateService,
              private placeService: PlacesProvider,
              private globalConfig: GlobalConfigsService,
              private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    let spinner = this.loadingCtrl.create({
      enableBackdropDismiss: false
    });
    spinner.present();
    this.loadPlace(this.navParams.data.id).subscribe((place) => {
      this.place = place;
      this.auth.loadPrincipal().subscribe((principal) => {
        if (principal) {
          this.principal = principal;
          this.departmentService.find({
            query: {place: (<any>this.place)._id, client: this.principal._id},
          }).subscribe((departments) => {
            this.departments = departments;
          });
          let favouriteIndex = (<any>this.principal.favoritePlaces).indexOf(this.place._id);
          this.isFavorite = favouriteIndex >= 0;
        } else {
          this.isFavorite = false
        }

        spinner.dismissAll();

      });
    });
  }

  loadPlace(id: String) {
    return this.placeService
      .findOne(
        id,
        {
          populate: [
            {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
            {
              path: 'topCategories',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
            {
              path: 'kitchens',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
            {
              path: 'city',
              populate: {path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}
            },
          ]
        }
      )
  }

  addToFavorite(place: Place) {
    let favouriteIndex = this.principal.favoritePlaces.indexOf((<any>this.place)._id);
    if (favouriteIndex >= 0) {
      this.principal.favoritePlaces.splice(favouriteIndex, 1);
    } else {
      this.principal.favoritePlaces.push((<any>this.place)._id);
    }
    this.clientService
      .update((<any>this.principal)._id, {favoritePlaces: this.principal.favoritePlaces})
      .subscribe();
    this.isFavorite = !this.isFavorite;
  }


}


