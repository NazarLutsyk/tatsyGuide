import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getPlaceTypeMultilangs(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/placeTypeMultilangs?target=${target}&fetch=${fetch}`);
  }

  create(placeTypeMultilangs: PlaceTypeMultilang): Observable<PlaceTypeMultilang>{
    return this.http.post<PlaceTypeMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeTypeMultilangs`, placeTypeMultilangs);
  }

  update(id:string, placeTypeMultilangs: PlaceTypeMultilang): Observable<PlaceTypeMultilang>{
    return this.http.put<PlaceTypeMultilang>(`${this.globalConfig.getGlobalHost()}/api/placeTypeMultilangs/${id}`, placeTypeMultilangs);
  }

}
