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
import {Observable} from "rxjs/Observable";
import {DepartmentProvider} from "../../providers/department/department-provider";


@IonicPage()
@Component({
  selector: 'page-my-places',
  templateUrl: 'my-places.html',
})
export class MyPlacesPage {


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
    private departmentService: DepartmentProvider,
    platform: Platform,
  ) {
    this.globalHost = globalVars.getGlobalHost();
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.departmentService
        .find({
          query: {client: (<any>this.principal)._id, roles: 'BOSS_PLACE'},
        })
        .subscribe((departments) => {
          let placeIds = departments.map(dep => dep.place);
          this.placesService.find({
            query: {_id: placeIds},
            populate: [
              {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}},
              {
                path: 'types',
                populate: {path: 'multilang', match: {lang: this.globalVars.getGlobalLang()}}
              }
            ]
          }).subscribe(places => this.places = places);
        });
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


  removePlace(place, $event) {
    event.stopPropagation();
    this.places.splice(this.places.indexOf(place), 1);
    this.placesService.remove(place._id);
  }
}
