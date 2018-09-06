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
import {KitchenMultilang} from "../../models/multilang/KitchenMultilang";
import {TopCategoryMultilang} from "../../models/multilang/TopCategoryMultilang";
import {CityMultilang} from "../../models/multilang/CityMultilang";
import {KitchenMultilangProvider} from "../../providers/kitchen-multilang/kitchen-multilang";
import {TopCategoryMultilangProvider} from "../../providers/top-category-multilang/top-category-multilang";
import {CityMultilangProvider} from "../../providers/city-multilang/city-multilang";

@IonicPage()
@Component({
  selector: 'page-create-place',
  templateUrl: 'create-place.html',
})
export class CreatePlacePage {

  nameInput = '';

  location: any = {lat: 0, lng: 0};
  placeTypesM: PlaceTypeMultilang[] = [];
  kitchensM: KitchenMultilang[] = [];
  topCategoriesM: TopCategoryMultilang[] = [];
  citiesM: CityMultilang[] = [];

  isAdmin = false;

  constructor(
    private event: Events,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private kitchenMultilangProvider: KitchenMultilangProvider,
    private topCatrgoryMultilangProvider: TopCategoryMultilangProvider,
    private cityMultilangProvider: CityMultilangProvider,
    private placeService: PlacesProvider,
    private globalConfig: GlobalConfigsService,
    private navCtrl: NavController,
    private auth: AuthProvider,
  ) {
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
    }).subscribe(placeTypesM => this.placeTypesM = placeTypesM);

    this.kitchenMultilangProvider.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    }).subscribe(kitchensM => this.kitchensM = kitchensM);

    this.topCatrgoryMultilangProvider.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    }).subscribe(topCategoriesM => this.topCategoriesM = topCategoriesM);

    this.cityMultilangProvider.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    }).subscribe(citiesM => this.citiesM = citiesM);

  }


  createPlace(form: NgForm) {
    const formPlace = form.form.value;

    // for (let key in formPlace.features) {
    //   if (typeof formPlace.features[key] === 'string') {
    //     formPlace.features[key] = true;
    //   }
    // }

    let placeMultilang = {
      name: formPlace.name,
      description: formPlace.description,
      address: {
        street: formPlace.address.street,
        number: formPlace.address.number
      },
      lang: this.globalConfig.getGlobalLang(),
      place: ''
    };
    let place: any = {
      phone: formPlace.phone,
      email: formPlace.email,
      // features: formPlace.features,
      types: formPlace.types ? formPlace.types : [],
      city: formPlace.city,
      site: formPlace.site,
      kitchens: formPlace.kitchens ? formPlace.kitchens : [],
      hashTags: formPlace.hashTags.replace(/[# ]/gi, '').split(',').filter(value => value.length > 0),
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
      place.topCategories = formPlace.topCategories ? formPlace.topCategories : [];
      place.allowed = formPlace.allowed;
    }

    this.navCtrl.push(AddAvatarAndPhotosPage, {place, placeMultilang});

  }

  goToChooseLocation() {
    this.navCtrl.push(ChooseLocationPage)
  }

  validateName(name) {
    let nameValue = name.value;
    let format = /#/;
    if (format.test(nameValue)) {
      this.nameInput = nameValue.slice(0, -1);
    }
  }
}
