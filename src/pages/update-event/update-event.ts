import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from "../../providers/event/EventProvider";
import {EventMultilang} from "../../models/multilang/EventMultilang";
import {NgForm} from "@angular/forms";
import {EventMultilangProvider} from "../../providers/event-multilang/event-multilang";
import {zip} from "rxjs/observable/zip";
import {AuthProvider} from "../../providers/auth/auth";
import {Event} from "../../models/promo/event/Event";

@IonicPage()
@Component({
  selector: 'page-update-event',
  templateUrl: 'update-event.html',
})
export class UpdateEventPage {

  event: Event = new Event();
  eventMultilang: EventMultilang = new EventMultilang();
  eventMultilangId: string;
  eventId: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventService: EventProvider,
    private eventMultilangServive: EventMultilangProvider,
    private auth: AuthProvider
  ) {
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
      this.eventService.find({
        query: {_id: this.navParams.data.object._id},
        populate: [{path: 'multilang', match: {lang: this.navParams.data.choosenLang}}]
      }).subscribe(([event]) => {
        this.event = event;
        this.eventId = event._id;
        this.eventMultilang = event.multilang[0];
        this.eventMultilangId = event.multilang[0]._id;
      })
    })
  }

  updatePromo(updateForm: NgForm) {
    //todo upload update
    this.eventMultilang = updateForm.form.value.multilang;
    this.event = updateForm.form.value.promo;

    let promoUpdateQuery = this.eventService.update(this.eventId, this.event);
    let promoMultilangQuery;
    if (this.eventMultilangId) {
      promoMultilangQuery =
        this.eventMultilangServive.update(this.eventMultilangId, this.eventMultilang);
    } else {
      this.eventMultilang.promo = <any>this.eventId;
      this.eventMultilang.lang = this.navParams.data.choosenLang;
      promoMultilangQuery =
        this.eventMultilangServive.create(this.eventMultilang);
    }

    zip(
      promoMultilangQuery,
      promoUpdateQuery
    ).subscribe(([multilang, event]) => this.navCtrl.pop());
  }

}
