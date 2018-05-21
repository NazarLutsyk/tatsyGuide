import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {BonuseMultilang} from "../../models/multilang/BonuseMultilang";

@Injectable()
export class BonuseMultilangProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/bonuseMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(bonuseMultilang: BonuseMultilang): Observable<BonuseMultilang> {
    return this.http.post<BonuseMultilang>(`${this.globalConfig.getGlobalHost()}/api/bonuseMultilangs`, bonuseMultilang);
  }

  update(id: string, bonuseMultilang: BonuseMultilang): Observable<BonuseMultilang> {
    return this.http.put<BonuseMultilang>(`${this.globalConfig.getGlobalHost()}/api/bonuseMultilangs/${id}`, bonuseMultilang);
  }

}
