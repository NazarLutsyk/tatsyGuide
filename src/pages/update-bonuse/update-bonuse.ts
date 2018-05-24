import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {BonuseMultilangProvider} from "../../providers/bonuse-multilang/bonuse-multilang";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {BonuseMultilang} from "../../models/multilang/BonuseMultilang";

@IonicPage()
@Component({
  selector: 'page-update-bonuse',
  templateUrl: 'update-bonuse.html',
})
export class UpdateBonusePage {

  bonuse: Bonuse;
  bonuseMultilang: BonuseMultilang;
  bonuseMultilangId: string;
  bonuseId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bonuseService: BonuseProvider,
    private bonuseMultilangServive: BonuseMultilangProvider
  ) {
  }

  ngOnInit() {
    this.bonuse = this.navParams.data.promo;
    this.bonuseMultilang = this.navParams.data.promo.multilang[0];
    this.bonuseMultilangId = (<any>this.bonuseMultilang)._id;
    this.bonuseId = (<any>this.bonuse)._id;
  }

  updatePromo(updateForm: NgForm) {
    //todo upload update
    this.bonuseMultilang = updateForm.form.value.multilang;
    this.bonuse = updateForm.form.value.promo;
    zip(
      this.bonuseMultilangServive.update(this.bonuseMultilangId, this.bonuseMultilang),
      this.bonuseService.update(this.bonuseId, this.bonuse)
    ).subscribe(([multilang, bonuse]) => this.navCtrl.pop());
  }

}
