import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {EventProvider} from "../../providers/event/EventProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {UpdateEventPage} from "../update-event/update-event";

@IonicPage()
@Component({
  selector: 'page-all-events',
  templateUrl: 'all-events.html',
})
export class AllEventsPage {

  globalHost: string;
  events: Event[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private eventService: EventProvider,
    private app: App
  ) {
    this.globalHost = this.gc.getGlobalHost();
    this.loadEvents()
      .subscribe((events) => {
        this.events = events;
      });
  }

  doRefresh(refresher: Refresher) {
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
        ]
      })
    )
  }

  removePromo(promo: any) {
    this.eventService.remove(promo._id).subscribe();
    this.events.splice(this.events.indexOf(promo),1);
  }

  updatePromo(promo: any) {
    this.app.getRootNav().push(UpdateEventPage, {promo: promo});
  }

}
