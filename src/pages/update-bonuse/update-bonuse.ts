import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {zip} from "rxjs/observable/zip";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {BonuseMultilangProvider} from "../../providers/bonuse-multilang/bonuse-multilang";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {BonuseMultilang} from "../../models/multilang/BonuseMultilang";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-update-bonuse',
  templateUrl: 'update-bonuse.html',
})
export class UpdateBonusePage {

  bonuse: Bonuse = new Bonuse();
  bonuseMultilang: BonuseMultilang = new BonuseMultilang();
  bonuseMultilangId: string;
  bonuseId: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bonuseService: BonuseProvider,
    private bonuseMultilangServive: BonuseMultilangProvider,
    private auth: AuthProvider
  ) {
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
      this.bonuseService.find({
        query: {_id: this.navParams.data.object._id},
        populate: [{path: 'multilang', match: {lang: this.navParams.data.choosenLang}}]
      }).subscribe(([bonuse]) => {
        this.bonuse = bonuse;
        this.bonuseId = bonuse._id;
        this.bonuseMultilang = bonuse.multilang[0];
        this.bonuseMultilangId = bonuse.multilang[0]._id;
      })
    })

  }

  updatePromo(updateForm: NgForm) {
    //todo upload update
    this.bonuseMultilang = updateForm.form.value.multilang;
    this.bonuse = updateForm.form.value.promo;

    let promoUpdateQuery = this.bonuseService.update(this.bonuseId, this.bonuse);
    let promoMultilangQuery;
    if (this.bonuseMultilangId) {
      promoMultilangQuery =
        this.bonuseMultilangServive.update(this.bonuseMultilangId, this.bonuseMultilang);
    } else {
      this.bonuseMultilang.promo = <any>this.bonuseId;
      this.bonuseMultilang.lang = this.navParams.data.choosenLang;
      promoMultilangQuery =
        this.bonuseMultilangServive.create(this.bonuseMultilang);
    }

    zip(
      promoMultilangQuery,
      promoUpdateQuery
    ).subscribe(([multilang, bonuse]) => this.navCtrl.pop());
  }

}
