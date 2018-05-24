import {Component} from '@angular/core';
import {AlertController, App, Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DrinkerApplicationPage} from "../drinker-application/drinker-application";
import {HttpClient} from "@angular/common/http";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {UpdatePlacePage} from "../update-place/update-place";
import {MailProvider} from "../../providers/mail/mail";

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-place-info',
  templateUrl: 'place-info.html',
})
export class PlaceInfoPage {
  globalHost: string;
  place: Place;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private gc: GlobalConfigsService,
    private placeService: PlacesProvider,
    private events: Events,
    private alertController: AlertController,
    private mailService: MailProvider
  ) {
    this.place = this.navParams.data;
    this.globalHost = gc.getGlobalHost();

  }


  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }

  connectToManager() {
    let alert = this.alertController.create({
      title: 'message', inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'message',
          placeholder: 'message',

        },

      ],
      buttons: [
        {
          text: 'send',
          handler: data => {
            // todo for whom to send an email???
            this.mailService.sendMail(data).subscribe();
          }
        }
      ]
    });
    alert.present();

  }


  removePlace(place: any) {
    this.placeService.remove(place._id).subscribe(() => {
      this.app.getRootNav().pop();
    });
  }

  updatePlace(place: Place) {
    this.app.getRootNav().push(UpdatePlacePage, {place: place});
  }
}
