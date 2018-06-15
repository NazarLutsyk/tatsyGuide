import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceTypeMultilang} from "../../models/multilang/PlaceTypeMultilang";

@Injectable()
export class PlaceTypeMultilangProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/placeTypeMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(placeTypeMultilangs: Object): Observable<PlaceTypeMultilang> {
    return this.http.post<PlaceTypeMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeTypeMultilangs`, placeTypeMultilangs);
  }

  update(id: string, placeTypeMultilangs: PlaceTypeMultilang): Observable<PlaceTypeMultilang> {
    return this.http.put<PlaceTypeMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeTypeMultilangs/${id}`, placeTypeMultilangs);
  }

}
