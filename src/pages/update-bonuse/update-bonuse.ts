import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {EventMultilang} from "../../models/multilang/EventMultilang";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {BonuseMultilangProvider} from "../../providers/bonuse-multilang/bonuse-multilang";

@IonicPage()
@Component({
  selector: 'page-update-bonuse',
  templateUrl: 'update-bonuse.html',
})
export class UpdateBonusePage {

  bonuse: Event;
  bonuseMultilang: EventMultilang;
  bonuseMultilangId: string;
  bonuseId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bonuseService: BonuseProvider,
    private bonuseMultilangServive: BonuseMultilangProvider
  ) {
  }

  ngOnInit(){
    this.bonuse = this.navParams.data.promo;
    this.bonuseMultilang = this.navParams.data.promo.multilang[0];
    this.bonuseMultilangId = (<any>this.bonuseMultilang)._id;
    this.bonuseId = (<any>this.bonuse)._id;
  }

  updatePromo(updateForm: NgForm){
    //todo upload update
    this.bonuseMultilang = updateForm.form.value.multilang;
    this.bonuse = updateForm.form.value.promo;
    zip(
      this.bonuseMultilangServive.update(this.bonuseMultilangId, this.bonuseMultilang),
      this.bonuseService.update(this.bonuseId, this.bonuse)
    ).subscribe(([multilang,bonuse]) => this.navCtrl.pop());

  }

}
