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
// import {UpdatePlacePage} from "../update-place/update-place";
import {CallNumber} from '@ionic-native/call-number';
import {PlaceAppliactionsPage} from "../place-appliactions/place-appliactions";

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
  place: Place;
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
    public translate: TranslateService,
    private callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController
  ) {

    translate.setDefaultLang('en');
    translate.use('ua');

  }

  ngOnInit() {
    this.place = this.navParams.data;
    this.globalHost = this.gc.getGlobalHost();

    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;

      if (this.principal) {
        this.departmentService.find({
          query: {place: (<any>this.place)._id, client: this.principal._id},
        }).subscribe((departments) => {
          if (departments.length > 0) {
            this.isAdmin = true;
            for (const department of departments) {
              if (department.roles.indexOf('BOSS_PLACE') >= 0)
                this.isBoss = true;
            }
          }
        });
      }

      this.departmentService.find({
        query: {place: (<any>this.place)._id, roles: ['BOSS_PLACE']},
        populate: [{path: 'client'}]
      }).subscribe((department) => {
        if (department[0]) {
          this.bossPlaceEmail = department[0].client.email;
        }
      })
    });
  }


  goToPlace(): void {
    window.location = `geo:${this.place.location.lat},${this.place.location.lng};u=35;`
  }

  connectToManager() {
    let alert = this.alertController.create({
      title: 'message',
      inputs: [
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
    //!!!!!!!!!!! todo change to modal
    // this.app.getRootNav().push(UpdatePlacePage, {place: place});

    let modalItem = this.modal.create(ModalChooseLangPage, {
      object: place,
      page: UpdatePlacePage
    });
    modalItem.present();
  }

  findPlacesByHashTag(hashTag: string) {
    this.app.getRootNav().push(HashTagsPage, {hashTag: hashTag});
  }

  sendComplaint() {
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
            this.complaintService.create(new Complaint(null, data.message, null, (<any>this.place)._id)).subscribe();
            data.message += `Place ${this.place.multilang[0].name}`;
            this.mailService.sendMail(data).subscribe();
          }
        }
      ]
    });
    alert.present();
  }

  updatePlaceDepartments(place: Place) {
    this.app.getRootNav().push(UpdatePlaceDepartmentsPage, place);
  }

  toTopPlaceCreate(place: Place) {
    this.app.getRootNav().push(CreateTopPlacePage, place);
  }

  callToPlace() {
    let alertForCall = this.alertController.create({
      title: this.place.phone,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.callNumber.callNumber(this.place.phone, true)
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
    //   "manageAdmins": "manage admins",
    //   "deletePlace": "delete place"


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
        console.log(value);

        const actionSheet = this.actionSheetCtrl.create({
            title: value['placeInfo.manage'],
            enableBackdropDismiss: true,

            buttons:
              [
                {
                  text: value['placeInfo.updatePlace'],
                  icon: !this.platform.is('ios') ? 'md-create' : null,
                  cssClass: "xxx",

                  handler: () => {
                    console.log(value['placeInfo.updatePlace']);
                    this.updatePlace(this.place);
                  }
                },
                {
                  text: value['placeInfo.addToTop'],
                  cssClass: "xxx",
                  icon: !this.platform.is('ios') ? 'arrow-round-up' : null,
                  handler: () => {
                    this.toTopPlaceCreate(this.place);
                  }
                },
                {
                  text: value['placeInfo.manageAdmins'],
                  cssClass: "xxx",
                  icon: !this.platform.is('ios') ? 'people' : null,

                  handler: () => {
                    this.updatePlaceDepartments(this.place);
                  }
                },
                {
                  text: value['placeInfo.deletePlace'],
                  cssClass: "deleteButton xxx",
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
                },
                {
                  text: value['placeInfo.cancel'],
                  icon: !this.platform.is('ios') ? 'close' : null,
                  role: 'cancel',

                }

              ]
          })
        ;
        actionSheet.present();
      });
  }

  toDrinkerPage() {
    this.app.getRootNav().push(PlaceAppliactionsPage,this.place)
  }
}
