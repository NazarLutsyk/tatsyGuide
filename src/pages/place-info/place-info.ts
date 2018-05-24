import {Component} from '@angular/core';
import {AlertController, App, Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {UpdatePlacePage} from "../update-place/update-place";
import {MailProvider} from "../../providers/mail/mail";
import {DepartmentProvider} from "../../providers/department/department-provider";

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-place-info',
  templateUrl: 'place-info.html',
})
export class PlaceInfoPage {
  globalHost: string;
  place: Place;
  bossPlaceEmail: string;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private gc: GlobalConfigsService,
    private placeService: PlacesProvider,
    private events: Events,
    private alertController: AlertController,
    private mailService: MailProvider,
    private departmentService: DepartmentProvider
  ) {
    this.place = this.navParams.data;
    this.globalHost = gc.getGlobalHost();

    departmentService.find({
      query: {place: (<any>this.place)._id},
      populate: [{path: 'client'}]
    }).subscribe((department) => {
      if (department[0]) {
        this.bossPlaceEmail = department[0].client.email;
      }
    })
  }


  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }

  connectToManager() {
    let alert = this.alertController.create({
      title: 'message', inputs: [
        {
          name: 'clientEmail',
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
            if (this.bossPlaceEmail) {
              data.email = this.bossPlaceEmail;
              this.mailService.sendMail(data).subscribe();
            }
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

  findPlacesByHashTag(hashTag: string) {
    // todo nazik find pop to root and find places
  }
}
