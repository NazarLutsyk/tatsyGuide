import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {EventProvider} from "../../providers/event/EventProvider";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gc: GlobalConfigsService,
    private eventService: EventProvider
  ) {
    this.globalHost = this.gc.getGlobalHost();
    eventService.find({
      query: {place: this.navParams.data._id},
      populate: [
        {
          path: 'multilang',
          match: {lang: gc.getGlobalLang()}
        }
      ]
    }).subscribe((events) => {
        this.events = events;
    });
  }

}
