import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class BonuseProvider {
  constructor(
    private http: HttpClient,
    private globalVars: GlobalConfigsService
  ) {
  }

  getBonuses(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalVars.getGlobalHost() + `/api/bonuses?target=${target}&fetch=${fetch}`);
  }


}
