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
    private globalConfig: GlobalConfigsService
  ) {

    // this.events.subscribe("favoritePlaces", () => {
    //   this.getAllPlaces();
    // })
  }

  findOne(id: any, request) {
    let url = this.globalConfig.getGlobalHost() + `/api/places/${id}?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return zip(
      this.http.get<any>(url),
      fromPromise(this.geolocation.getCurrentPosition())
    ).map(([place, position]) => {
      place.distance = this.findDistance(position, place);
      return place;
    });
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/places?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return zip(
      this.http.get<any[]>(url),
      fromPromise(this.geolocation.getCurrentPosition())
    ).map(([places, position]) => {
      for (const place of places) {
        place.distance = this.findDistance(position, place);
      }
      return places;
    });
  }

  create(place: Object): Observable<Place> {
    return this.http.post<Place>(`${this.globalConfig.getGlobalHost()}/api/places`, place);
  }

  update(id: string, place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.globalConfig.getGlobalHost()}/api/places/${id}`, place);
  }


  findDistance(myPosition, place) {
    let lat1 = myPosition.coords.latitude;
    let lon1 = myPosition.coords.longitude;
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

  upload(id, files: { avatar?: string, images?: string[] }): Observable<Place> {
    let url = `https://localhost:3000/api/places/${id}`;
    let data = new FormData();
    if (files.avatar)
      data.append('avatar', files.avatar);
    if (files.images.length > 0) {
      for (const image of files.images) {
        data.append('images', image);
      }
    }
    return this.http.put<Place>(url, data);
  }

  remove(_id: any) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/places/${_id}`).subscribe();
  }


}
