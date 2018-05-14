import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TopPlace} from "../../models/tops/TopPlace";

@Injectable()
export class TopPlaceProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  getTopPlaces(target, fetch): Observable<TopPlace[]> {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<TopPlace[]>(this.globalConfig.getGlobalHost() + `/api/topPlaces?target=${target}&fetch=${fetch}`);
  }

  create(topPlace: TopPlace): Observable<TopPlace> {
    return this.http.post<TopPlace>(`${this.globalConfig.getGlobalHost()}/api/topPlaces`, topPlace);
  }

  update(id: string, topPlace: TopPlace): Observable<TopPlace> {
    return this.http.put<TopPlace>(`${this.globalConfig.getGlobalHost()}/api/topPlaces/${id}`, topPlace);
  }
}
