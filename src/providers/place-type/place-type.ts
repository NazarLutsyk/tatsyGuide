import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {host1, host2, lang} from "../../configs/GlobalVariables";
import {PlaceType} from "../../models/placeType/PlaceType";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the PlaceTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaceTypeProvider {

  private globalHost: string;

  constructor(public http: HttpClient, platform: Platform) {
    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }
  }

// все типы мест с переводом
  getPlaceTypes(target, fetch): Observable<PlaceType[]> {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<PlaceType[]>(this.globalHost + `/api/placeTypes?target=${target}&fetch=${fetch}`);
  }
}
