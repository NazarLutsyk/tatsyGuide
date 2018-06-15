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

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/placeTypes?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);  }

  create(placeType: Object = {}): Observable<PlaceType> {
    return this.http.post<PlaceType>(`${this.globalConfig.getGlobalHost()}/api/placeTypes`, placeType);
  }

  update(id: string, placeType: PlaceType): Observable<PlaceType> {
    return this.http.put<PlaceType>(`${this.globalConfig.getGlobalHost()}/api/placeTypes/${id}`, placeType);
  }

  remove(_id:string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/placeTypes/${_id}`);
  }
}
