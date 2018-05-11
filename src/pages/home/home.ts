import {Component, NgZone, OnInit} from '@angular/core';
import {Events, NavController, NavParams, Platform} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {Place} from "../../models/place/Place";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {zip} from 'rxjs/observable/zip';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

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
    private storage: Storage,
    platform: Platform,
    private _ngZone: NgZone
  ) {

    this.globalHost = globalVars.getGlobalHost();

    this.events.subscribe('functionCall:find', eventData => {
      this.placesService.sortingAndFiltering(this.places, eventData).subscribe(value => {
        this.places = value;
      }, (err) => {
        console.log(err);
      });

    })

  }

  ngOnInit() {
    this.auth.principal.subscribe((principal) => {
      this.principal = principal;
    });

    zip(
      this.auth.loadPrincipal(),
      this.placesService.getAllPlaces()
    ).subscribe(
      ([principal, places]) => {
        this.places = places;
      },
      (err) => {
        console.log(err);
      });
  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, place);
  }
}
