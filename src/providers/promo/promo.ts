import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs";

@Injectable()
export class PromoProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  findOne(id: any, request): Observable<any> {
    let url = this.globalConfig.getGlobalHost() + `/api/promos/${id}?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  find(request): Observable<any> {
    let url = this.globalConfig.getGlobalHost() + `/api/promos?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

}
