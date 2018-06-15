import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from "../../providers/event/EventProvider";
import {EventMultilang} from "../../models/multilang/EventMultilang";
import {NgForm} from "@angular/forms";
import {EventMultilangProvider} from "../../providers/event-multilang/event-multilang";
import {zip} from "rxjs/observable/zip";
import {AuthProvider} from "../../providers/auth/auth";
import {Event} from "../../models/promo/event/Event";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Camera, CameraOptions} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-update-event',
  templateUrl: 'update-event.html',
})
export class UpdateEventPage {

  globalHost;
  event: Event = new Event();
  eventMultilang: EventMultilang = new EventMultilang();
  eventMultilangId: string;
  eventId: string;
  image: string;
  imageToShow: string;
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventService: EventProvider,
    private eventMultilangServive: EventMultilangProvider,
    private auth: AuthProvider,
    private globalConfig: GlobalConfigsService,
    private camera: Camera
  ) {
  }

  ngOnInit() {
    this.globalHost = this.globalConfig.getGlobalHost();

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
        if (event.multilang[0]) {
          this.eventMultilang = event.multilang[0];
          this.eventMultilangId = event.multilang[0]._id;
        }
        this.imageToShow = this.globalHost + this.event.image;
      })
    })
  }

  updatePromo(updateForm: NgForm) {
    let uploadImg = new Observable((subscriber) => subscriber.next(true));

    if (this.event.image !== this.image) {
      uploadImg = this.eventService.upload(this.eventId, this.image);
    }

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
      promoUpdateQuery,
      uploadImg
    ).subscribe(([multilang, event]) => this.navCtrl.pop());
  }

  setNewImage(input) {
    input.preventDefault();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1280,
      targetHeight: 960,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
      this.imageToShow = imageData;
    })

  }

}
