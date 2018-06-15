import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {EventProvider} from "../../providers/event/EventProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {AuthProvider} from "../../providers/auth/auth";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {UpdateEventPage} from "../update-event/update-event";
import {SingleEventPage} from "../single-event/single-event";

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
  ) {
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
    return this.eventService.find(({
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
        ],
        skip: this.skip,
        limit: this.limit
      })
    )
  }

  removePromo(promo: any) {
    this.eventService.remove(promo._id).subscribe();
    this.events.splice(this.events.indexOf(promo), 1);
  }

  updatePromo(promo: any) {
    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: promo,
      page: UpdateEventPage
    });
    modalItem.present();
  }

  loadNextEventsPage(event: InfiniteScroll) {
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
    this.app.getRootNav().push(SingleEventPage, event);
  }
}
