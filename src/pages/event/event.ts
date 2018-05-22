import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {EventProvider} from "../../providers/event/EventProvider";
import {DrinkerApplicationPage} from "../drinker-application/drinker-application";
import {CreateEventPage} from "../create-event/create-event";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  globalHost: string;
  events: Event[] = [];
  place: Place;

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

  ngOnInit() {
    this.place = this.navParams.data;
  }

  goToCreateEvent() {
    this.app.getRootNav().push(CreateEventPage, {place: this.place});
  }


  doRefresh(refresher: Refresher) {
    this.loadEvents()
      .subscribe((events) => {
        this.events = events;
        refresher.complete();
      });
  }

  loadEvents() {
    return this.eventService.find({
      query: {place: this.navParams.data._id},
      populate: [
        {
          path: 'multilang',
          match: {lang: this.gc.getGlobalLang()}
        }
      ]
    })
  }
}
