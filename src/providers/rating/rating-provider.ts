import {HttpClient} from '@angular/common/http';
import {Injectable, PlatformRef} from '@angular/core';
import {host1, host2, lang} from "../../configs/GlobalVariables";
import {Observable} from "rxjs/Observable";
import {Bonuse} from "../../models/promo/bonus/Bonuse";
import {Platform} from 'ionic-angular';

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


}
