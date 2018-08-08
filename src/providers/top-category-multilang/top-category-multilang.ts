import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {TopCategoryMultilang} from "../../models/multilang/TopCategoryMultilang";

@Injectable()
export class TopCategoryMultilangProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/topCategoryMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(topCategotyMultilang: Object = {}): Observable<TopCategoryMultilang> {
    return this.http.post<TopCategoryMultilang>(`${this.globalConfig.getGlobalHost()}/api/topCategoryMultilangs`, topCategotyMultilang);
  }

  update(id: string, topCategotyMultilang: TopCategoryMultilang): Observable<TopCategoryMultilang> {
    return this.http.put<TopCategoryMultilang>(`${this.globalConfig.getGlobalHost()}/api/topCategoryMultilangs/${id}`, topCategotyMultilang);
  }

  remove(_id: string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/topCategoryMultilangs/${_id}`);
  }

}
