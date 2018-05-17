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

  getPlaceMultilangs(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/placeMultilangs?target=${target}&fetch=${fetch}`);
  }

  create(placeMultilang: Object): Observable<PlaceMultilang>{
    return this.http.post<PlaceMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeMultilangs`, placeMultilang);
  }

  update(id:string, placeMultilang: PlaceMultilang): Observable<PlaceMultilang>{
    return this.http.put<PlaceMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeMultilangs/${id}`, placeMultilang);
  }
}
