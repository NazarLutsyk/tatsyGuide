import {Component, OnInit} from '@angular/core';
import {Events, NavController, NavParams, Platform} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {Place} from "../../models/place/Place";
import {host1, host2} from "../../configs/GlobalVariables";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
// ionic cordova platform rm android && ionic cordova platform add android &&  ionic cordova prepare android && ionic cordova build android && ionic cordova run android

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
    private navParams : NavParams,
    private placesService: PlacesProvider,
    private clientService: ClientProvider,
    private bonuseService: BonuseProvider,
    private events: Events,
    private storage: Storage,
    platform: Platform
  ) {


    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }

    this.events.subscribe('functionCall:find', eventData => {
      this.placesService.sortingAndFiltering(this.places, eventData).subscribe(value => {
        console.log("value", value);
        this.places = value;
      });

    })

  }

  ngOnInit() {
    console.log("onInit home page");
    this.placesService.getAllPlaces().subscribe(value => {
      console.log("onInit home page", value);
      this.places = value;
    });


  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, place);
    // this.navCtrl.setRoot(PlaceDeatilsPage,place);
  }

  ionViewDidEnter() {
    console.log("principal on home page", `${this.globalVars.getGlobalHost()}/auth/principal`);
    this.http.get(`${this.globalVars.getGlobalHost()}/auth/principal`).subscribe(value => {

    });
  }




}
