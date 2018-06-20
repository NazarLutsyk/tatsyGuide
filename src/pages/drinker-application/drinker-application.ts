import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {Place} from "../../models/place/Place";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";


class DrinkerApplicationObjectTemplate {
  _id: string;
  friends: string;
  goal: string;
  budged: number;
  date: string;
  place: string;
  placeObj: Place;

}

@IonicPage()
@Component({
  selector: 'page-drinker-application',
  templateUrl: 'drinker-application.html',
})

export class DrinkerApplicationPage {

  drinkerApplicationObject: DrinkerApplicationObjectTemplate = new DrinkerApplicationObjectTemplate();
  isActive: boolean;
  places: Place[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    private drinkAppService: DrinkApplicationProvider,
    private placeService: PlacesProvider,
    private events: Events
  ) {
    if (this.navParams.data.place) {
      this.drinkerApplicationObject.place = this.navParams.data.place._id;
      this.drinkerApplicationObject.placeObj = this.navParams.data.place;
      this.places = [this.navParams.data.place];
    } else {
      this.placeService.find({
        populate: [
          {
            path: 'multilang',
            select: 'name',
            match: {lang: this.globalVars.getGlobalLang()}
          },
          {
            path: 'types',
            select: 'multilang',
            populate: {
              path: 'multilang',
              select: 'name',
              match: {
                lang: this.globalVars.getGlobalLang()
              }
            }
          },
        ]
      })
        .subscribe(places => {
          this.places = places;
        });
    }
    this.isActive = this.navParams.data.disabled;
  }


  logForm() {
    delete this.drinkerApplicationObject.placeObj;
    this.drinkAppService.create(this.drinkerApplicationObject).subscribe(drinkApp => {
      this.events.publish('refresh:drinkapps');
      this.navCtrl.pop();
    });
  }
}
