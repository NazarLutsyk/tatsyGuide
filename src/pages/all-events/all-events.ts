import {Component} from '@angular/core';
import {
  AlertController,
  App,
  InfiniteScroll,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Refresher
} from 'ionic-angular';
import {EventProvider} from "../../providers/event/EventProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {UpdateEventPage} from "../update-event/update-event";
import {SingleEventPage} from "../single-event/single-event";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-all-events',
  templateUrl: 'all-events.html',
})
export class AllEventsPage {

  principal;

  globalHost: string;
  events: Event[] = [];

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private eventService: EventProvider,
    private app: App,
    private auth: AuthProvider,
    public modal: ModalController,
    private alert: AlertController,
    private translate: TranslateService,
    private globalConfig : GlobalConfigsService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.globalHost = this.gc.getGlobalHost();
      this.loadEvents()
        .subscribe((events) => {
          this.events = events;
        });
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadEvents()
      .subscribe((events) => {
        this.events = events;
        refresher.complete();
      });
  }

  loadEvents() {
    return this.eventService.find({
      aggregate: [
        {$match: {topPromo: true}},
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
            as: 'place',
          }
        },
        {$unwind: "$place"},
        {$match: {'place.lang': this.gc.getGlobalLang(), 'multilang.lang': this.gc.getGlobalLang()}},
        {
          $project: {
            _id: 1,
            createdAt: 1,
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
        {$limit: this.limit},
      ]
    })
  }

  removePromo(promo: any) {

    event.stopPropagation();
    this.eventService.remove(promo._id).subscribe();
    this.events.splice(this.events.indexOf(promo), 1);
  }


  updatePromo(promo
                :
                any
  ) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: promo,
      page: UpdateEventPage
    });
    modalItem.present();
  }

  loadNextEventsPage(event
                       :
                       InfiniteScroll
  ) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadEvents()
        .subscribe((events) => {
          if (events.length < this.pageSize) this.allLoaded = true;
          this.events.push(...events);
          event.complete();
        })
    }

  }

  setNextPage() {
    this.skip += this.pageSize;
  }

  goToSingleEvent(event) {
    this.app.getRootNav().push(SingleEventPage, {event, pm: event.place});
  }
}
