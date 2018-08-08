import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CityMultilang} from "../../models/multilang/CityMultilang";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class CityMultilangProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }


  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/cityMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(cityMultilang: Object = {}): Observable<CityMultilang> {
    return this.http.post<CityMultilang>(`${this.globalConfig.getGlobalHost()}/api/cityMultilangs`, cityMultilang);
  }

  update(id: string, cityMultilang: CityMultilang): Observable<CityMultilang> {
    return this.http.put<CityMultilang>(`${this.globalConfig.getGlobalHost()}/api/cityMultilangs/${id}`, cityMultilang);
  }

  remove(_id: string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/cityMultilangs/${_id}`);
  }

}
