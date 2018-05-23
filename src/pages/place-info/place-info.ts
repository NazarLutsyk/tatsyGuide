import {Component} from '@angular/core';
import {AlertController, App, Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DrinkerApplicationPage} from "../drinker-application/drinker-application";
import {HttpClient} from "@angular/common/http";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";

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
    private http: HttpClient
  ) {
    this.place = this.navParams.data;
    this.globalHost = gc.getGlobalHost();

  }


  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }


  goToCreateDrinkerApplication(place) {
    this.app.getRootNav().push(DrinkerApplicationPage, {place, disabled: true});
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
            // todo send data to admin`s email !!!!
            // todo tune drinker`s api to mail
            this.http.post(`${this.globalHost}/mail/send`, data);
            console.log(data);
          }
        }
      ]
    });
    alert.present();

  }


  removePLace(place: any) {
    this.placeService.remove(place._id).subscribe(() => {
        this.navCtrl.pop();
    });
  }
}
