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

  getBonuses(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/bonuses?target=${target}&fetch=${fetch}`);
  }

  create(bonuse: Bonuse): Observable<Bonuse>{
    return this.http.post<Bonuse>(`${this.globalConfig.getGlobalHost()}/api/bonuses`, bonuse);
  }

  update(id:string, bonuse: Bonuse): Observable<Bonuse>{
    return this.http.put<Bonuse>(`${this.globalConfig.getGlobalHost()}/api/bonuses/${id}`, bonuse);
  }

}
