import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";


class DrinkerApplicationObjectTemplate {
  _id: string;
  friends: string;
  goal: string;
  budged: number;
  date: string;
  place: string;

}

@IonicPage()
@Component({
  selector: 'page-drinker-application',
  templateUrl: 'drinker-application.html',
})

export class DrinkerApplicationPage {

  drinkerApplicationObject: DrinkerApplicationObjectTemplate = new DrinkerApplicationObjectTemplate();
  isActive: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
    private drinkAppService: DrinkApplicationProvider
  ) {
    this.drinkerApplicationObject.place = this.navParams.data.place;
    this.isActive = this.navParams.data.disabled;
  }


  logForm() {
    this.drinkAppService.create(this.drinkerApplicationObject).subscribe(drinkApp => {
      this.navCtrl.pop();
    });
  }
}
