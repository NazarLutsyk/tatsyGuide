import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {PlaceMultilang} from "../../models/multilang/PlaceMultilang";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {PlaceMultilangProvider} from "../../providers/place-multilang/place-multilang";
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {PlaceTypeMultilang} from "../../models/multilang/PlaceTypeMultilang";
import {PlaceTypeMultilangProvider} from "../../providers/place-type-multilang/place-type-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {ChooseLocationPage} from "../choose-location/choose-location";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-update-place',
  templateUrl: 'update-place.html',
})
export class UpdatePlacePage {

  @ViewChild('form') form: NgForm;

  place: Place;
  location: { lat: number, lng: number };
  placeId: string;
  placeMultilang: PlaceMultilang;
  placeMultilangId: string;
  placeTypesM: PlaceTypeMultilang[] = [];
  hashTags: string;
  topCategories: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placeService: PlacesProvider,
    private placeMultilangService: PlaceMultilangProvider,
    private placeTypeMultilangService: PlaceTypeMultilangProvider,
    private globalConfig: GlobalConfigsService,
    private event: Events,
    private auth: AuthProvider
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

    this.place = this.navParams.data.place;
    this.placeMultilang = this.navParams.data.place.multilang[0];
    this.placeMultilangId = (<any>this.placeMultilang)._id;
    this.placeId = (<any>this.place)._id;

    this.location = this.place.location;
    this.place.types = this.place.types.map(pt => (<any>pt)._id);

    this.topCategories = this.place.topCategories.join(',');
    this.hashTags = this.place.hashTags.join(',');
    this.placeTypeMultilangService.find({
      query: {lang: this.globalConfig.getGlobalLang()}
    })
      .subscribe((placeTypesM) => {
        this.placeTypesM = placeTypesM;
      })
  }

  updatePlace(updateForm: NgForm) {
    this.placeMultilang = updateForm.form.value.multilang;
    this.place = updateForm.form.value.place;

    this.place.topCategories =
      this.topCategories.length > 0 ? this.topCategories.split(',') : [];
    this.place.hashTags =
      this.hashTags.length > 0 ? this.hashTags.split(',') : [];
    this.place.days = {
      1: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      2: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      3: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      4: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      5: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      6: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end},
      7: {start: updateForm.form.value.place.days[1].start, end: updateForm.form.value.place.days[1].end}
    };
    this.place.location = this.location;
    zip(
      this.placeMultilangService.update(this.placeMultilangId, this.placeMultilang),
      this.placeService.update(this.placeId, this.place)
    ).subscribe(([multilang, place]) => this.navCtrl.pop());
  }

  goToChooseLocation() {
    this.navCtrl.push(ChooseLocationPage)
  }

}
