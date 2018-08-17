import {Component, OnInit} from '@angular/core';
import {
  App,
  Events,
  InfiniteScroll,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Refresher
} from 'ionic-angular';
import {PromoProvider} from "../../providers/promo/promo";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {NewsProvider} from "../../providers/news/NewsProvider";
import {BonuseProvider} from "../../providers/bonuse/bonuseProvider";
import {EventProvider} from "../../providers/event/EventProvider";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {UpdateNewsPage} from "../update-news/update-news";
import {UpdateBonusePage} from "../update-bonuse/update-bonuse";
import {UpdateEventPage} from "../update-event/update-event";
import {SingleNewsPage} from "../single-news/single-news";
import {SingleEventPage} from "../single-event/single-event";
import {SingleBonusePage} from "../single-bonuse/single-bonuse";

@IonicPage()
@Component({
  selector: 'page-all-promos',
  templateUrl: 'all-promos.html',
})
export class AllPromosPage implements OnInit {

  principal = null;
  promos: any[] = [];
  globalHost: string;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  eventData = {
    kind: '',
    city: ''
  };

  promoQuery: any = {};
  promoMultilangQuery: any = {};
  placeQuery: any = {};
  searchStr = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalConfig: GlobalConfigsService,
    private promoService: PromoProvider,
    private newsService: NewsProvider,
    private bonuseService: BonuseProvider,
    private eventService: EventProvider,
    private app: App,
    private auth: AuthProvider,
    public modal: ModalController,
    private events: Events
  ) {
  }

  ngOnInit(): void {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.globalHost = this.globalConfig.getGlobalHost();
      this.loadPromos().subscribe((promos) => {
        this.promos = promos;
        this.events.subscribe('functionCall:findPromos', (eventData) => {
          this.skip = 0;
          this.allLoaded = false;
          this.eventData = eventData;
          this.loadPromos(eventData).subscribe(promos => this.promos = promos);
        });
      });
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;
    this.loadPromos(this.eventData)
      .subscribe((promos) => {
        this.promos = promos;
        refresher.complete();
      });
  }

  prepareQuery(dataQuery = {kind: '', city: ''}) {
    this.promoQuery = {
      query: {},
    };
    this.promoMultilangQuery = {
      query: {},
    };
    this.placeQuery = {
      query: {},
    };
    if (dataQuery.kind) {
      this.promoQuery.query.kind = dataQuery.kind;
    }
    if (dataQuery.city) {
      this.placeQuery.query['place.city'] = dataQuery.city;
    }
    if (this.searchStr) {
      this.promoMultilangQuery.query['multilang.header'] = {$regex: this.searchStr, $options: "i"};
    }
  }

  loadPromos(dataQuery = {kind: '', city: ''}) {
    this.prepareQuery(dataQuery);
    return this.promoService.find({
      aggregate: [
        {$match: {topPromo: true, ...this.promoQuery.query}},
        {
          $lookup: {
            from: 'multilangs',
            localField: '_id',
            foreignField: 'promo',
            as: 'multilang',
          }
        },
        {$unwind: "$multilang"},
        {
          $lookup: {
            from: 'multilangs',
            localField: 'place',
            foreignField: 'place',
            as: 'placeM',
          }
        },
        {$unwind: "$placeM"},
        {
          $match: {
            'placeM.lang': this.globalConfig.getGlobalLang(),
            'multilang.lang': this.globalConfig.getGlobalLang(),
            ...this.promoMultilangQuery.query
          }
        },
        {
          $lookup: {
            from: 'places',
            localField: 'place',
            foreignField: '_id',
            as: 'place',
          }
        },
        {$unwind: "$place"},
        {
          $match: {
            ...this.placeQuery.query
          }
        },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            placeM: 1,
            place: 1,
            multilang: 1,
            startDate: 1,
            endDate: 1,
            image: 1,
            kind: 1,
          }
        },
        {$sort: {createdAt: -1}},
        {$skip: this.skip},
        {$limit: this.limit}
      ]
    })
  }

  removePromo(promo: any) {
    let service = null;
    let promoKind = promo.kind.toLowerCase();
    if (promoKind === 'bonuse') {
      service = this.bonuseService;
    } else if (promoKind === 'event') {
      service = this.eventService;
    } else if (promoKind === 'news') {
      service = this.newsService;
    } else {
      return;
    }
    service.remove(promo._id).subscribe();
    this.promos.splice(this.promos.indexOf(promo), 1);
  }

  updatePromo(promo: any) {
    let updatePage = null;
    let promoKind = promo.kind.toLowerCase();
    if (promoKind === 'bonuse') {
      updatePage = UpdateBonusePage;
    } else if (promoKind === 'event') {
      updatePage = UpdateEventPage;
    } else if (promoKind === 'news') {
      updatePage = UpdateNewsPage;
    } else {
      return;
    }
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: promo,
      page: updatePage
    });
    modalItem.present();
  }

  loadNextPromosPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadPromos(this.eventData)
        .subscribe((promos) => {
          if (promos.length < this.pageSize) this.allLoaded = true;
          this.promos.push(...promos);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }

  goToSinglePromo(promo) {
    let promoKind = promo.kind.toLowerCase();
    if (promoKind === 'bonuse') {
      this.app.getRootNav().push(SingleBonusePage, {bonuse: promo, pm: promo.placeM});
    } else if (promoKind === 'event') {
      this.app.getRootNav().push(SingleEventPage, {event: promo, pm: promo.placeM});
    } else if (promoKind === 'news') {
      this.app.getRootNav().push(SingleNewsPage, {news: promo, pm: promo.placeM});
    } else {
      return;
    }
  }


  onSearchPromos($event) {
    this.skip = 0;
    this.allLoaded = false;
    setTimeout(() => {
      let searchStrInput = $event.target.value || '';
      this.searchStr = searchStrInput.trim();
      this.loadPromos(this.eventData).subscribe(promos => this.promos = promos);
    }, 500);

  }
}
