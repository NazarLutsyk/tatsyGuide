import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class EventMultilangProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
    ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/eventMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }


}
