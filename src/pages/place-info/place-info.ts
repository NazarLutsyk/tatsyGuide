import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  App,
  Events,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import {Place} from "../../models/place/Place";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlacesProvider} from "../../providers/places-service/PlacesProvider";
import {MailProvider} from "../../providers/mail/mail";
import {DepartmentProvider} from "../../providers/department/department-provider";
import {ComplaintProvider} from "../../providers/complaint/complaint-provider";
import {Complaint} from "../../models/complaint/Complaint";
import {HashTagsPage} from "../hash-tags/hash-tags";
import {UpdatePlaceDepartmentsPage} from "../update-place-departments/update-place-departments";
import {AuthProvider} from "../../providers/auth/auth";
import {ModalChooseLangPage} from "../modal-choose-lang/modal-choose-lang";
import {UpdatePlacePage} from "../update-place/update-place";
import {CreateTopPlacePage} from "../create-top-place/create-top-place";
import {TranslateService} from "@ngx-translate/core";
import {CallNumber} from '@ionic-native/call-number';
import {PlaceAppliactionsPage} from "../place-appliactions/place-appliactions";
import {TopPlaceApplicationPage} from "../top-place-application/top-place-application";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import { GalleryModal } from 'ionic-gallery-modal';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-place-info',
  templateUrl: 'place-info.html',
})
export class PlaceInfoPage {
  principal;
  isAdmin = false;
  isBoss = false;

  globalHost: string;
  place: Place = new Place();
  bossPlaceEmail: string;

  constructor(
    public modal: ModalController,
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private gc: GlobalConfigsService,
    private placeService: PlacesProvider,
    private events: Events,
    private alertController: AlertController,
    private mailService: MailProvider,
    private departmentService: DepartmentProvider,
    private complaintService: ComplaintProvider,
    private auth: AuthProvider,
    private callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController,
    private globalConfig: GlobalConfigsService,
    public translate: TranslateService,
    private iab: InAppBrowser
  ) {
  }

  ngOnInit() {
    this.globalHost = this.gc.getGlobalHost();
    this.place = this.navParams.data;
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      if (this.principal) {
        this.departmentService.find({
          query: {place: (<any>this.place)._id, client: this.principal._id},
          populate: [{path: 'client'}]
        }).subscribe((departments) => {
          if (departments.length > 0) {
            let bossIndex = departments.findIndex((value, index, arr) => {
              return value.roles.indexOf('BOSS_PLACE') >= 0 && value.client.email;
            });
            if (bossIndex < 0) {
              bossIndex = departments.findIndex((value, index, arr) => {
                return value.client.email;
              });
            }
            if (bossIndex >= 0) {
              this.bossPlaceEmail = departments[bossIndex].client.email;
            }
            this.isAdmin = true;
            for (const department of departments) {
              if (department.roles.indexOf('BOSS_PLACE') >= 0)
                this.isBoss = true;
            }
          }
        });
      }
    });
  }

  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }

  removePlace(place: any) {
    this.placeService.remove(place._id).subscribe(() => {
      this.app.getRootNav().pop();
    });
  }

  updatePlace(place: Place) {

    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: place,
      page: UpdatePlacePage
    });
    modalItem.present();
  }

  findPlacesByHashTag(hashTag: string) {
    this.app.getRootNav().push(HashTagsPage, {hashTag: '#' + hashTag});
  }

  sendComplaint() {
    this.sendEmail(data => {
        this.complaintService.create(new Complaint(null, data.message, null, (<any>this.place)._id)).subscribe();
        data.message += `\n\tPlace ${this.place.multilang[0].name}`;
        this.mailService.sendMail(data).subscribe();
      }
    )
  }

  connectToManager(email) {
    this.sendEmail(data => {
      data.message += `\n\tPlace ${this.place.multilang[0].name}`;
      data.to = email || this.bossPlaceEmail;
      console.log(data);
      this.mailService.sendMail(data).subscribe();
    });
  }

  sendEmail(handler) {
    this.translate.get([
      'alert.message',
      'alert.email',
    ]).subscribe(value => {
      let alert = this.alertController.create({
        title: '',
        inputs: [
          {
            name: 'from',
            placeholder: value['alert.email']
          },
          {
            name: 'message',
            placeholder: value['alert.message'],
          },
        ],
        buttons: [
          {
            text: 'send',
            handler: (data) => {
              if (data.message && data.from && data.from.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                handler(data);
                return true;
              } else {
                alert.setMessage('Invalid data!');
                return false;
              }
            }
          }
        ]
      });
      alert.present();
    });
  }

  updatePlaceDepartments(place: Place) {
    this.app.getRootNav().push(UpdatePlaceDepartmentsPage, place);
  }

  toTopPlaceCreate(place: Place) {
    this.app.getRootNav().push(CreateTopPlacePage, place);
  }

  callToPlace(phone) {
    let alertForCall = this.alertController.create({
      title: phone,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.callNumber.callNumber(phone, true)
              .then(value => console.log('call number', value))
              .catch(reason => console.log(reason))
          }
        },
        {
          text: "cancel"
        }
      ]
    });
    alertForCall.present();
  }

  presentActionSheet() {


    this.translate.get([
      'placeInfo.manage',
      'placeInfo.updatePlace',
      'placeInfo.addToTop',
      'placeInfo.manageAdmins',
      'placeInfo.deletePlace',
      'placeInfo.cancel',
      'placeInfo.confirm',
      'placeInfo.deleteMessage',
      'placeInfo.deleteTitle',

    ])
      .subscribe(value => {

        let buttons = [
          {
            text: value['placeInfo.updatePlace'],
            icon: !this.platform.is('ios') ? 'md-create' : null,
            cssClass: "xxx",

            handler: () => {
              this.updatePlace(this.place);
            }
          },
          {
            text: value['placeInfo.cancel'],
            icon: !this.platform.is('ios') ? 'close' : null,
            role: 'cancel',
          }
        ];

        if (this.principal.roles.indexOf('ADMIN') >= 0) {
          buttons.push({
            text: value['placeInfo.addToTop'],
            cssClass: "xxx",
            icon: !this.platform.is('ios') ? 'arrow-round-up' : null,
            handler: () => {
              this.toTopPlaceCreate(this.place);
            }
          });
        } else {
          buttons.push({
            text: value['placeInfo.addToTop'],
            cssClass: "xxx",
            icon: !this.platform.is('ios') ? 'arrow-round-up' : null,
            handler: () => {
              this.toTopPlaceApplication();
            }
          });
        }

        if (this.principal && (this.isBoss || this.principal.roles.indexOf('ADMIN') > -1)) {
          buttons.push({
            text: value['placeInfo.manageAdmins'],
            cssClass: "xxx",
            icon: !this.platform.is('ios') ? 'people' : null,

            handler: () => {
              this.updatePlaceDepartments(this.place);
            }
          });

          buttons.push({
            text: value['placeInfo.deletePlace'],
            cssClass: "actionSheetDeleteColor xxx",
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              let alert = this.alertController.create({
                title: value['placeInfo.deleteTitle'],
                message: value['placeInfo.deleteMessage'],
                buttons: [
                  {
                    text: value['placeInfo.cancel'],
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: value['placeInfo.confirm'],
                    handler: () => {
                      this.removePlace(this.place);
                    }
                  }
                ]
              });
              alert.present();
            }
          });
        }

        const actionSheet = this.actionSheetCtrl.create({
            title: value['placeInfo.manage'],
            enableBackdropDismiss: true,
            cssClass: 'actionSheetStyle',
            buttons: buttons
          })
        ;
        actionSheet.present();
      });
  }

  toDrinkerPage() {
    this.app.getRootNav().push(PlaceAppliactionsPage, this.place)
  }

  toTopPlaceApplication() {
    this.app.getRootNav().push(TopPlaceApplicationPage, {place: this.place, client: this.principal});
  }

  showPhoto(index) {
    let modal = this.modal.create(GalleryModal, {
      photos: this.place.images.map(image => {return {url: this.globalHost + image}}),
      initialSlide: index
    });
    modal.present();
  }

  goToPlaceSite(site: string) {
    let finalURL = '';
    if (site.length > 0) {
      let splitter = '://';
      let protocolIndex = site.indexOf(splitter);
      if (protocolIndex > 0) {
        site = site.slice(protocolIndex + splitter.length);
      }
      finalURL = 'http://' + site;
      console.log(finalURL);
      let inAppBrowserObject = this.iab.create(finalURL, '_blank');
    }
  }
}
