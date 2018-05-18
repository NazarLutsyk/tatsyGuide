import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform, Refresher} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {AuthProvider} from "../../providers/auth/auth";
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {HttpClient} from "@angular/common/http";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
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
        .getDepartments({query: {client: (<any>this.principal)._id, roles: 'BOSS_PLACE'}})
        .subscribe((departments) => {
          let placeIds = departments.map(dep => dep.place);
          this.onLoad({query: {_id: placeIds}}).subscribe(places => this.places = places);
        });
    });
  }

  toDetails(place) {
    this.placesService.findOne(place.id).subscribe((foundedPlace) => {
      this.navCtrl.push(PlaceDeatilsPage, foundedPlace);
    });
  }


  onLoad(target: Object = {}) {
    return new Observable<Place[]>((subscriber) => {
      this.placesService.getAllPlaces(target).subscribe((places) => {
        subscriber.next(places);
        subscriber.complete();
      }, (error) => {
        console.log(error);
        subscriber.error(error);
      });
    });
  }

  removePlace(place, $event) {
    event.stopPropagation();
    this.places.splice(this.places.indexOf(place), 1);
    this.placesService.remove(place._id);
  }
}
