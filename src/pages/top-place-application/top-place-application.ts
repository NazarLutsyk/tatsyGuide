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
  now = new Date();

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

    let userName = this.client && this.client.name ? this.client.name : 'Anonim';
    let userSurname = this.client && this.client.surname ? this.client.surname : '';
    let userEmail = this.client && this.client.email ? this.client.email : value.from;
    let placeName = this.place && this.place.multilang && this.place.multilang.length > 0 ? this.place.multilang[0].name : '';
    let placeEmails = this.place && this.place.emails ? this.place.emails.join('  ') : '';
    let placeId = this.place && this.place._id ? this.place._id : '';

    let data: any = {};
    data.subject = 'Top Place Application';
    data.from = this.client.email;
    data.message = `
                  <h4>User:</h4> 
                      ${userName} 
                      ${userSurname} <br>
                      ${userEmail}
                  <h4>Date:</h4> 
                      From: ${value.startDate} <br>
                      To: ${value.endDate} <br>
                  <h4>Place:</h4>
                      ${placeId} <br>
                      ${placeName} <br>    
                      ${placeEmails} <br>    
                `;

    this.mailService.sendMail(data).subscribe();
    this.navCtrl.pop();
  }
}
