import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {UpdateBonusePage} from "../update-bonuse/update-bonuse";

@IonicPage()
@Component({
  selector: 'page-all-bonuses',
  templateUrl: 'all-bonuses.html',
})
export class AllBonusesPage {

  bonuses: Bonuse[] = [];
  globalHost: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private bonuseService: BonuseProvider,
    private app: App
  ) {
    this.globalHost = gc.getGlobalHost();

    this.loadBonuses().subscribe((bonuses) => {
      this.bonuses = bonuses;
    });
  }

  doRefresh(refresher: Refresher) {
    this.loadBonuses()
      .subscribe((bonuses) => {
        this.bonuses = bonuses;
        refresher.complete();
      });
  }

  loadBonuses() {
    return this.bonuseService.find({
      query: {topPromo: true},
      sort: {createdAt: -1},
      populate: [
        {
          path: 'multilang',
          match: {lang: this.gc.getGlobalLang()}
        },
        {
          path: 'place',
          select: 'multilang',
          populate: [{
            path: 'multilang',
            match: {lang: this.gc.getGlobalLang()},
            select: 'name'
          }]
        }
      ]
    })
  }

  removePromo(promo: any) {
    this.bonuseService.remove(promo._id).subscribe();
    this.bonuses.splice(this.bonuses.indexOf(promo),1);
  }

  updatePromo(promo: any) {
    this.app.getRootNav().push(UpdateBonusePage, {promo: promo});
  }

}
