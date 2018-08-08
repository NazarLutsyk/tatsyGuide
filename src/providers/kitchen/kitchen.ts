import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Kitchen} from "../../models/kitchen/Kitchen";

@Injectable()
export class KitchenProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/kitchens?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);  }

  create(kitchen: Object = {}): Observable<Kitchen> {
    return this.http.post<Kitchen>(`${this.globalConfig.getGlobalHost()}/api/kitchens`, kitchen);
  }

  update(id: string, kitchen: Kitchen): Observable<Kitchen> {
    return this.http.put<Kitchen>(`${this.globalConfig.getGlobalHost()}/api/kitchens/${id}`, kitchen);
  }

  remove(_id:string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/kitchens/${_id}`);
  }

}
