import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BonuseProvider {
  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/bonuses?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(bonuse: Bonuse): Observable<Bonuse> {
    return this.http.post<Bonuse>(`${this.globalConfig.getGlobalHost()}/api/bonuses`, bonuse);
  }

  update(id: string, bonuse: Bonuse): Observable<Bonuse> {
    return this.http.put<Bonuse>(`${this.globalConfig.getGlobalHost()}/api/bonuses/${id}`, bonuse);
  }

}
