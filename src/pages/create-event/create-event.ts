import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {EventProvider} from "../../providers/event/EventProvider";
import {EventMultilangProvider} from "../../providers/event-multilang/event-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NgForm} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  isAdmin = false;
  imageToUpload;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private eventService: EventProvider,
    private eventMultilangService: EventMultilangProvider,
    private globalConfig: GlobalConfigsService,
    private auth: AuthProvider
  ) {
  }

  ngOnInit() {
    this.auth.loadPrincipal().subscribe(principal => {
      if (principal.roles.indexOf('ADMIN') >= 0) {
        this.isAdmin = true;
      }
    })
  }

  logForm(eventForm: NgForm) {
    let formValues = eventForm.form.value;
    let event = formValues.event;
    let eventMultilang = formValues.multilang;

    event.place = this.navParams.data.place._id;
    eventMultilang.lang = this.globalConfig.getGlobalLang();

    this.eventService.create(event).subscribe(event => {
      eventMultilang.promo = (<any>event)._id;
      this.eventMultilangService.create(eventMultilang).subscribe((eventM) => {
        this.eventService.upload((<any>event)._id, this.imageToUpload).subscribe();
        this.navCtrl.pop();
      });
    })
  }

  getAvatar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageToUpload = imageData;
    })
  }

}
