import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {Place} from "../../models/place/Place";
import {Events, Platform} from "ionic-angular";
import {BonuseProvider} from "../bonuse/bonuseProvider";
import {PlaceTypeProvider} from "../place-type/place-type";
import {EventProvider} from "../event/EventProvider";
import {NewsProvider} from "../news/NewsProvider";
import {ComplaintProvider} from "../complaint/complaint-provider";
import {DrinkApplicationProvider} from "../drinkApplication/drinkApplication-provider";
import {RatingProvider} from "../rating/rating-provider";
import {DepartmentProvider} from "../department/department-provider";
import {zip} from "rxjs/observable/zip";
import {Geolocation} from '@ionic-native/geolocation';
import {fromPromise} from "rxjs/observable/fromPromise";
import {Storage} from "@ionic/storage";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";

declare var window: any;
declare var position: any;

@Injectable()
export class PlacesProvider {

  constructor(
    private http: HttpClient, plt: Platform,
    private bonuseProvider: BonuseProvider,
    private eventProvider: EventProvider,
    private newsProvider: NewsProvider,
    private placeTypeService: PlaceTypeProvider,
    private complaintProvider: ComplaintProvider,
    private drinkApplicationProvider: DrinkApplicationProvider,
    private ratingService: RatingProvider,
    private departmentService: DepartmentProvider,
    private geolocation: Geolocation,
    private events: Events,
    private storage: Storage,
    private globalConfig: GlobalConfigsService,
    private fileTransfer: FileTransfer
  ) {
  }

  findOneWithMultilang(id, langID): Observable<Place> {
    let lang = this.globalConfig.langChooser(langID);
    let url = this.globalConfig.getGlobalHost() + `/api/places/${id}?populate=[{"path":"multilang","match":{"lang" : ${lang} }]`;
    return this.http.get<Place>(url);
  }

  findOne(id: any, request) {
    let url = this.globalConfig.getGlobalHost() + `/api/places/${id}?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any>(url).map((place) => {
      place.distance = this.findDistance(this.globalConfig.globalPosition, place);
      return place;
    });
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/places?`;
    for (const key in request) {
      url += `${key}=${JSON.stringify(request[key])}&`;
    }
    return this.http.get<any[]>(url).map((places) => {
      for (const place of places) {
        place.distance = this.findDistance(this.globalConfig.globalPosition, place);
      }
      return places;
    });
  }

  create(place: Object): Observable<Place> {
    return this.http.post<Place>(`${this.globalConfig.getGlobalHost()}/api/places`, place);
  }

  update(id: string, place: Object): Observable<Place> {
    return this.http.put<Place>(`${this.globalConfig.getGlobalHost()}/api/places/${id}`, place);
  }


  findDistance(myPosition, place) {
    let lat1 = myPosition.latitude;
    let lon1 = myPosition.longitude;
    let lat2 = place.location.lat;
    let lon2 = place.location.lng;
    let p = 0.017453292519943295;
    let a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a));

  }

  promisefyMyPosition(): Promise<any> {
    return new Promise(resolve => {
      window.navigator.geolocation.getCurrentPosition(position => {
        resolve(position);
      });

    })
  }


  async findDistanceToPlace(place: Place): Promise<number> {
    let position = await this.promisefyMyPosition();
    let myPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    function findDistance() {

      let lat1 = myPosition.lat;
      let lon1 = myPosition.lng;
      let lat2 = place.location.lat;
      let lon2 = place.location.lng;
      let p = 0.017453292519943295;
      let a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
      return 12742 * Math.asin(Math.sqrt(a));

    }

    return findDistance();
  }

  upload(id, files: { avatar?: string, images?: string[] }) {
    let url = `${this.globalConfig.getGlobalHost()}/api/places/${id}`;
    const transfer: FileTransferObject = this.fileTransfer.create();
    if (files.avatar) {
      fromPromise(transfer.upload(files.avatar, url, {fileKey: 'avatar', httpMethod: 'put'})).subscribe();
    }
    if (files.images && files.images.length > 0) {
      let toUpload = [];
      for (const file of files.images) {
        toUpload.push(fromPromise(transfer.upload(file, url, {fileKey: 'images', httpMethod: 'put'})));
      }
      zip(...toUpload).subscribe();
    }
  }

  remove(_id: any) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/places/${_id}`);
  }


}
