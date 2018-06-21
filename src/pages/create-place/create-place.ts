import {Component} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PlaceTypeMultilang} from "../../models/multilang/PlaceTypeMultilang";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {ChooseLocationPage} from "../choose-location/choose-location";
import {AuthProvider} from "../../providers/auth/auth";
import {AddAvatarAndPhotosPage} from "../add-avatar-and-photos/add-avatar-and-photos";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-create-place',
  templateUrl: 'create-place.html',
})
export class CreatePlacePage {

  location: any = {lat: 0, lng: 0};
  placeTypesM: PlaceTypeMultilang[] = [];

  isAdmin = false;

  constructor(
    private event: Events,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private placeService: PlacesProvider,
    private globalConfig: GlobalConfigsService,
    private navCtrl: NavController,
    private auth: AuthProvider,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
    this.event.subscribe("choosePosition", (data) => {
      this.location.lat = data.lat;
      this.location.lng = data.lng;
    })
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
    });
    this.placeTypeMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    })
      .subscribe((placeTypesM) => {
        this.placeTypesM = placeTypesM;
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
    let place: any = {
      phone: formPlace.phone,
      email: formPlace.email,
      features: formPlace.features,
      types: formPlace.types,
      hashTags: formPlace.hashTags.split(','),
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

    if (this.isAdmin) {
      place.topCategories =
        formPlace.topCategories ? formPlace.topCategories.split(',') : [];
      place.allowed = formPlace.allowed;
    }
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
