import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {TopCategory} from "../../models/topCategory/TopCategory";

@Injectable()
export class TopCategoryProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/topCategories?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(topCategory: Object = {}): Observable<TopCategory> {
    return this.http.post<TopCategory>(`${this.globalConfig.getGlobalHost()}/api/topCategories`, topCategory);
  }

  update(id: string, topCategory: TopCategory): Observable<TopCategory> {
    return this.http.put<TopCategory>(`${this.globalConfig.getGlobalHost()}/api/topCategories/${id}`, topCategory);
  }

  remove(_id:string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/topCategories/${_id}`);
  }

}
