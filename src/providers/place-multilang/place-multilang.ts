import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {PlaceMultilang} from "../../models/multilang/PlaceMultilang";

@Injectable()
export class PlaceMultilangProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/placeMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(placeMultilang: Object): Observable<PlaceMultilang>{
    return this.http.post<PlaceMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeMultilangs`, placeMultilang);
  }

  update(id:string, placeMultilang: PlaceMultilang): Observable<PlaceMultilang>{
    return this.http.put<PlaceMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeMultilangs/${id}`, placeMultilang);
  }
}
