import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
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

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/topPlaces?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(topPlace: TopPlace): Observable<TopPlace> {
    return this.http.post<TopPlace>(`${this.globalConfig.getGlobalHost()}/api/topPlaces`, topPlace);
  }

  update(id: string, topPlace: TopPlace): Observable<TopPlace> {
    return this.http.put<TopPlace>(`${this.globalConfig.getGlobalHost()}/api/topPlaces/${id}`, topPlace);
  }

  remove(_id: any) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/topPlaces/${_id}`);
  }
}
