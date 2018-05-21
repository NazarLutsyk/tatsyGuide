import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {AuthProvider} from "../../providers/auth/auth";
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {HttpClient} from "@angular/common/http";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";

@IonicPage()
@Component({
  selector: 'page-my-favorite-places',
  templateUrl: 'my-favorite-places.html',
})
export class MyFavoritePlacesPage {


  places: Place[];
  globalHost: string;
  principal: Client;

  constructor(
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    public navCtrl: NavController,
    private navParams: NavParams,
    private placesService: PlacesProvider,
    private clientService: ClientProvider,
    private bonuseService: BonuseProvider,
    private events: Events,
    private auth: AuthProvider,
    platform: Platform,
  ) {
    this.globalHost = globalVars.getGlobalHost();
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.placesService
        .find({
          query: {_id: this.principal.favoritePlaces},
          populate: [
            {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
            }
          ]
        })
        .subscribe(places => this.places = places);
    });
  }

  toDetails(place) {
    this.placesService
      .find(
        {
          query: {_id: place._id},
          populate: [
            {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
            {
              path: 'types',
              populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
            }
          ]
        }
      )
      .subscribe((foundedPlace) => {
        this.navCtrl.push(PlaceDeatilsPage, foundedPlace[0]);
      });
  }



  removeFavoritePlace(place, event) {
    event.stopPropagation();
    this.auth.loadPrincipal().subscribe((principal) => {
      this.places.splice(this.places.indexOf(place), 1);
      this.clientService.update((<any>principal)._id, {favoritePlaces: this.places}).subscribe();
    });

  }
}
