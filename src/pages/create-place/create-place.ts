import {Component} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PlaceTypeMultilang} from "../../models/multilang/PlaceTypeMultilang";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {ChooseLocationPage} from "../choose-location/choose-location";
import {AddAvatarAndPhotosPage} from "../add-avatar-and-photos/add-avatar-and-photos";
import {PlaceTypeProvider} from "../../providers/place-type/place-type";

@IonicPage()
@Component({
  selector: 'page-create-place',
  templateUrl: 'create-place.html',
})
export class CreatePlacePage {

  location: any = {lat: 0, lng: 0};
  placeTypes: PlaceTypeMultilang[] = [];

  constructor(
    private event: Events,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    private placeTypeService: PlaceTypeProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private placeService: PlacesProvider,
    private globalConfig: GlobalConfigsService,
    private navCtrl: NavController
  ) {

    this.event.subscribe("choosePosition", (data) => {
      this.location.lat = data.lat;
      this.location.lng = data.lng;
    })
  }

  ngOnInit() {
    this.placeTypeService
      .find(
        {
          populate: [{path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}]
        }
      )
      .subscribe((placeTypes) => {
        this.placeTypes = placeTypes;
      })
  }


  createPlace(form: NgForm) {
    const formPlace = form.form.value;
    for (let key in formPlace.features) {
      if (typeof formPlace.features[key] === 'string') {
        formPlace.features[key] = true;
      }
    }

    let placeMultilang = {
      name: formPlace.name,
      description: formPlace.description,
      address: {
        city: formPlace.address.city,
        street: formPlace.address.street,
        number: formPlace.address.number
      },
      lang: this.globalConfig.getGlobalLang(),
      place: ''
    };
    let place = {
      phone: formPlace.phone,
      email: formPlace.email,
      features: formPlace.features,
      types: formPlace.types,
      days: {
        1: {start: formPlace.days[1].start, end: formPlace.days[1].end},
        2: {start: formPlace.days[1].start, end: formPlace.days[1].end},
        3: {start: formPlace.days[1].start, end: formPlace.days[1].end},
        4: {start: formPlace.days[1].start, end: formPlace.days[1].end},
        5: {start: formPlace.days[1].start, end: formPlace.days[1].end},
        6: {start: formPlace.days[1].start, end: formPlace.days[1].end},
        7: {start: formPlace.days[1].start, end: formPlace.days[1].end}
      },
      location: this.location
    };
    this.placeService.create(place).subscribe((place) => {
      placeMultilang.place = (<any>place)._id;
      this.placeMultilangService.create(placeMultilang).subscribe(multilang => {
        this.navCtrl.push(AddAvatarAndPhotosPage, {id: (<any>place)._id});
      });
    });
  }


  goToChooseLocation() {
    this.navCtrl.push(ChooseLocationPage)
  }
}
