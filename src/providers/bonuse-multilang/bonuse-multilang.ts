import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getBonuseMultilangs(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/bonuseMultilangs?target=${target}&fetch=${fetch}`);
  }

  create(bonuseMultilang: BonuseMultilang): Observable<BonuseMultilang>{
    return this.http.post<BonuseMultilang>(`${this.globalConfig.getGlobalHost()}/api/bonuseMultilangs`, bonuseMultilang);
  }

  update(id:string, bonuseMultilang: BonuseMultilang): Observable<BonuseMultilang>{
    return this.http.put<BonuseMultilang>(`${this.globalConfig.getGlobalHost()}/api/bonuseMultilangs/${id}`, bonuseMultilang);
  }

}
