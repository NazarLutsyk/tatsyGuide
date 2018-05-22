import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {EventProvider} from "../../providers/event/EventProvider";
import {EventMultilangProvider} from "../../providers/event-multilang/event-multilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  eventObject: {
    place: string,
    image: string,
    startDate: string,
    endDate: string
  } = {endDate: '', image: '', place: '', startDate: ''};

  eventMObject: {
    header: string,
    description: string,
    promo: string,
    lang: string
  } = {description: '', header: '', promo: '', lang: ''};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private eventService: EventProvider,
    private eventMultilangService: EventMultilangProvider,
    private globalConfig: GlobalConfigsService
  ) {
  }

  ngOnInit() {
    this.eventObject.place = this.navParams.data.place._id;
    this.eventMObject.lang = this.globalConfig.getGlobalLang();
  }

  logForm() {
    this.eventService.create(this.eventObject).subscribe(event => {
      this.eventMObject.promo = (<any>event)._id;
      this.eventMultilangService.create(this.eventMObject).subscribe((eventM) => {
        this.eventService.upload((<any>event)._id, this.eventObject.image).subscribe();
        this.navCtrl.pop();
      });
    })
  }

  getAvatar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.eventObject.image = 'data:image/jpeg;base64,' + imageData;
    })
  }

}
