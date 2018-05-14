import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceType} from "../../models/placeType/PlaceType";

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
    return this.http.get<PlaceType[]>(this.globalConfig.getGlobalHost() + `/api/placeTypes?target=${target}&fetch=${fetch}`);
  }

  create(placeType: PlaceType): Observable<PlaceType> {
    return this.http.post<PlaceType>(`${this.globalConfig.getGlobalHost()}/api/placeTypes`, placeType);
  }

  update(id: string, placeType: PlaceType): Observable<PlaceType> {
    return this.http.put<PlaceType>(`${this.globalConfig.getGlobalHost()}/api/placeTypes/${id}`, placeType);
  }
}
