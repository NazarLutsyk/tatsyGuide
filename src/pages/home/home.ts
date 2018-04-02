import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PlacesServiceProvider} from "../../providers/places-service/places-service";
import {FullPlaceDTO} from "../../models/place/FullPlaceDTO";
import {PlaceDeatilsPage} from "../place-deatils/place-deatils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  places: FullPlaceDTO[] = [];

  constructor(public navCtrl: NavController, private placesService: PlacesServiceProvider) {

  }

  ngOnInit() {
    this.placesService.getAllPlaces().then(value => this.places = value);

  }

  toDetails(currentChoosenPlace) {
    console.log(currentChoosenPlace);
    this.navCtrl.push(PlaceDeatilsPage, currentChoosenPlace);
  }

}
