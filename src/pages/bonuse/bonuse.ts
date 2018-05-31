import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {CreateBonusePage} from "../create-bonuse/create-bonuse";
import {UpdateBonusePage} from "../update-bonuse/update-bonuse";
import {AuthProvider} from "../../providers/auth/auth";
import {DepartmentProvider} from "../../providers/department/department-provider";

@IonicPage()
@Component({
  selector: 'page-bonuse',
  templateUrl: 'bonuse.html',
})
export class BonusePage {

  principal;
  departments;

  bonuses: Bonuse[] = [];
  globalHost: string;
  place: Place;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private bonuseService: BonuseProvider,
    private auth: AuthProvider,
    private departmentService: DepartmentProvider
  ) {
  }

  ngOnInit() {
    this.globalHost = this.gc.getGlobalHost();
    this.place = this.navParams.data;

    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.departmentService.find({
        query: {place: (<any>this.place)._id, client: this.principal._id},
      }).subscribe((departments) => {
        this.departments = departments;
        this.loadBonuses().subscribe((bonuses) => {
          this.bonuses = bonuses;
        });
      });
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadBonuses()
      .subscribe((bonuses) => {
        this.bonuses = bonuses;
        refresher.complete();
      });
  }

  goToCreateBonuse() {
    this.app.getRootNav().push(CreateBonusePage, {place: this.place});
  }

  loadBonuses() {
    return this.bonuseService.find({
      query: {place: this.navParams.data._id},
      populate: [
        {
          path: 'multilang',
          match: {lang: this.gc.getGlobalLang()}
        }
      ],
      skip: this.skip,
      limit: this.limit
    })
  }

  removePromo(promo: any) {
    this.bonuseService.remove(promo._id).subscribe();
    this.bonuses.splice(this.bonuses.indexOf(promo), 1);
  }

  updatePromo(promo: any) {
    this.app.getRootNav().push(UpdateBonusePage, {promo: promo});
  }

  loadNextBonusesPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadBonuses()
        .subscribe((bonuses) => {
          if (bonuses.length < this.pageSize) this.allLoaded = true;
          this.bonuses.push(...bonuses);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }
}
