import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../providers/event/EventProvider";
import {EventMultilang} from "../../models/multilang/EventMultilang";
import {NgForm} from "@angular/forms";
import {EventMultilangProvider} from "../../providers/event-multilang/event-multilang";
import {zip} from "rxjs/observable/zip";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-update-event',
  templateUrl: 'update-event.html',
})
export class UpdateEventPage {

  event: Event;
  eventMultilang: EventMultilang;
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

  ngOnInit(){
    this.event = this.navParams.data.promo;
    this.eventMultilang = this.navParams.data.promo.multilang[0];
    this.eventMultilangId = (<any>this.eventMultilang)._id;
    this.eventId = (<any>this.event)._id;

    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
    })
  }

  updatePromo(updateForm: NgForm){
    //todo upload update
    this.eventMultilang = updateForm.form.value.multilang;
    this.event = updateForm.form.value.promo;
    zip(
      this.eventMultilangServive.update(this.eventMultilangId, this.eventMultilang),
      this.eventService.update(this.eventId, this.event)
    ).subscribe(([multilang,event]) => this.navCtrl.pop());
  }

}
