import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PlaceType} from "../../models/placeType/PlaceType";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class PlaceTypeProvider {


  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  getPlaceTypes(target, fetch): Observable<PlaceType[]> {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<PlaceType[]>(this.globalConfig.getGlobalHost()+ `/api/placeTypes?target=${target}&fetch=${fetch}`);
  }
}
