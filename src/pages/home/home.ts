import {Component, OnInit} from '@angular/core';
import {Events, NavController, Platform} from 'ionic-angular';
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {Place} from "../../models/place/Place";
import {host1, host2} from "../../configs/GlobalVariables";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";
import {Client} from "../../models/client/Client";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  places: Place[];
  globalHost: string;
  principal: Client;

  constructor(
    public navCtrl: NavController,
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
    this.placesService.getAllPlaces().subscribe(value => {
      this.places = value;
      console.log(value[0]);
    });



  }

  toDetails(place) {
    this.navCtrl.push(PlaceDeatilsPage, place);
    // this.navCtrl.setRoot(PlaceDeatilsPage,place);
  }
  ionViewDidEnter(){
    console.log("home enter");

    this.storage.get('currentPrincipal').then(value => {

      console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(JSON.parse(value))});

  }



}
