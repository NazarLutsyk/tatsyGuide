import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {CreateBonusePage} from "../create-bonuse/create-bonuse";

@IonicPage()
@Component({
  selector: 'page-bonuse',
  templateUrl: 'bonuse.html',
})
export class BonusePage {

  bonuses: Bonuse[] = [];
  globalHost: string;
  place: Place;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private bonuseService: BonuseProvider,
  ) {
    this.globalHost = this.gc.getGlobalHost();

    this.loadBonuses().subscribe((bonuses) => {
      this.bonuses = bonuses;
    });
  }

  ngOnInit() {
    this.place = this.navParams.data;
  }


  doRefresh(refresher: Refresher) {
    this.loadBonuses()
      .subscribe((bonuses) => {
        this.bonuses = bonuses;
        refresher.complete();
      });
  }

  goToCreateBonuse() {
    this.app.getRootNav().push(CreateBonusePage, {place: this.place});
  }

  loadBonuses(){
    return this.bonuseService.find({
      query: {place: this.navParams.data._id},
      populate: [
        {
          path: 'multilang',
          match: {lang: this.gc.getGlobalLang()}
        }
      ]
    })
  }
}
