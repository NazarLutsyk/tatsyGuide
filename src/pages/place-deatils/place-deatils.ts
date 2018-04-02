import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FullPlaceDTO} from "../../models/place/FullPlaceDTO";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
// import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';



@IonicPage()
@Component({
  selector: 'page-place-deatils',
  templateUrl: 'place-deatils.html',
  styles: ['place-details.scss']
})
export class PlaceDeatilsPage {
  currentPlaceData: FullPlaceDTO;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // console.log(this.navParams.data)
    this.currentPlaceData = this.navParams.data;
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.currentPlaceData.location.lat,
          lng: this.currentPlaceData.location.lat
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.currentPlaceData.location.lat,
            lng: this.currentPlaceData.location.lat
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }
  // loadMap(){
  //
  //   let location = new GoogleMapsLatLng(-34.9290,138.6010);
  //
  //   this.map = new GoogleMap('map', {
  //     'backgroundColor': 'white',
  //     'controls': {
  //       'compass': true,
  //       'myLocationButton': true,
  //       'indoorPicker': true,
  //       'zoom': true
  //     },
  //     'gestures': {
  //       'scroll': true,
  //       'tilt': true,
  //       'rotate': true,
  //       'zoom': true
  //     },
  //     'camera': {
  //       'latLng': location,
  //       'tilt': 30,
  //       'zoom': 15,
  //       'bearing': 50
  //     }
  //   });
  //
  //   this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
  //     console.log('Map is ready!');
  //   });
  //
  // }

}//


