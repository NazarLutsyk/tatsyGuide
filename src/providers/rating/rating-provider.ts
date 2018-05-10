import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {host1, host2} from "../../configs/GlobalVariables";
import {Platform} from 'ionic-angular';
import {Rating} from "../../models/rating/Rating";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the BonuseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RatingProvider {

  private globalHost: string;

  constructor(public http: HttpClient, platform: Platform) {
    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }

  }

  getRatings(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalHost + `/api/ratings?target=${target}&fetch=${fetch}`);
  }

  // TODO как создать запрос по конкретному месту?
  getRatingsOfCurrentPlace(placeID): Observable<Rating[]> {
    let fetch = JSON.stringify({place: {_id: placeID}});
    console.log(this.globalHost + `/api/ratings?fetch=[${fetch}]`);
    return this.http.get<Rating[]>(this.globalHost + `/api/ratings?fetch=[${fetch}]`);
  }


}
