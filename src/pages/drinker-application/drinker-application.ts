import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Client} from "../../models/client/Client";
import {Place} from "../../models/place/Place";
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";


class DrinkerApplicationObjectTemplate {
  _id: string;
  friends: string;
  goal: string;
  budged: number;
  date: string;
  organizer: Client;
  place: Place;

}

@IonicPage()
@Component({
  selector: 'page-drinker-application',
  templateUrl: 'drinker-application.html',
})

export class DrinkerApplicationPage {

  drinkerApplicationObject: DrinkerApplicationObjectTemplate = new DrinkerApplicationObjectTemplate();

  logForm() {
    //todo add save to database logic
    console.log(this.drinkerApplicationObject)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private globalVars: GlobalConfigsService
  ) {
    // TODO check this 2127 may 9
    this.drinkerApplicationObject.place = this.navParams.data.place;
  }

  ionViewDidLoad() {
    this.http.get(`${this.globalVars.getGlobalHost()}/auth/principal`).subscribe(value => console.log(value));
  }


}
