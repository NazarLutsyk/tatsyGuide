import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {City} from "../../models/city/City";

@Injectable()
export class CityProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }


  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/cities?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(city: Object = {}): Observable<City> {
    return this.http.post<City>(`${this.globalConfig.getGlobalHost()}/api/cities`, city);
  }

  update(id: string, city: City): Observable<City> {
    return this.http.put<City>(`${this.globalConfig.getGlobalHost()}/api/cities/${id}`, city);
  }

  remove(_id: string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/cities/${_id}`);
  }

}
