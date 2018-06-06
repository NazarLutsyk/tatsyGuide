import {Component} from '@angular/core';
import {App, InfiniteScroll, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {EventProvider} from "../../providers/event/EventProvider";
import {CreateEventPage} from "../create-event/create-event";
import {UpdateEventPage} from "../update-event/update-event";
import {AuthProvider} from "../../providers/auth/auth";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";


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
  ) {
  }

  ngOnInit() {
    this.globalHost = this.gc.getGlobalHost();
    this.place = this.navParams.data;

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
      query: {place: this.navParams.data._id},
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
}
