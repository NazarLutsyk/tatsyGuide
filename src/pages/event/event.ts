import {Component} from '@angular/core';
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
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {EventProvider} from "../../providers/event/EventProvider";
import {CreateEventPage} from "../create-event/create-event";
import {UpdateEventPage} from "../update-event/update-event";
import {AuthProvider} from "../../providers/auth/auth";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {SingleEventPage} from "../single-event/single-event";
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  principal;
  departments;

  globalHost: string;
  events: Event[] = [];
  place: Place;

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
    private departmentService: DepartmentProvider,
    public modal: ModalController,
    private globalEvents: Events,
    private translate: TranslateService,
    private globalConfig : GlobalConfigsService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use(this.globalConfig.deviceLang);
  }

  ngOnInit() {
    this.globalHost = this.gc.getGlobalHost();
    this.place = this.navParams.data;

    this.globalEvents.subscribe('refresh:events', () => {
      this.skip = 0;
      this.allLoaded = false;
      this.loadEvents().subscribe(events => this.events = events);
    });

    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      if (this.principal) {
        this.departmentService.find({
          query: {place: (<any>this.place)._id, client: this.principal._id},
        }).subscribe((departments) => {
          this.departments = departments;
          this.loadEvents()
            .subscribe((events) => {
              this.events = events;
            });
        });
      } else {
        this.loadEvents()
          .subscribe((events) => {
            this.events = events;
          });
      }
    });
  }

  goToCreateEvent() {
    this.app.getRootNav().push(CreateEventPage, {place: this.place});
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
        {$match: {place: this.navParams.data._id}},
        {
          $lookup: {
            from: 'multilangs',
            localField: '_id',
            foreignField: 'promo',
            as: 'multilang',
          }
        },
        {$unwind: "$multilang"},
        {$match: {'multilang.lang': this.gc.getGlobalLang()}},
        {
          $project: {
            _id: 1,
            createdAt: 1,
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
    this.app.getRootNav().push(SingleEventPage, {event, pm: null});
  }
}
