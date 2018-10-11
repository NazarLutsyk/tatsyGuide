import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {MailProvider} from "../../providers/mail/mail";
import {DateTimePickerConfigProvider} from "../../providers/date-time-picker-config/date-time-picker-config";

@IonicPage()
@Component({
  selector: 'page-top-place-application',
  templateUrl: 'top-place-application.html',
})
export class TopPlaceApplicationPage {

  place;
  client;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mailService: MailProvider,
    public datePickerConfig: DateTimePickerConfigProvider
  ) {
  }

  ngOnInit() {
    this.place = this.navParams.data.place;
    this.client = this.navParams.data.client;
  }

  sendApp(form: NgForm) {
    let value = form.form.value;
    this.mailService.sendMail({
      from: this.client.email,
      message: `To top place ${this.place.multilang[0].name} from ${value.startDate} to ${value.endDate}`
    }).subscribe();
    this.navCtrl.pop();
  }
}
