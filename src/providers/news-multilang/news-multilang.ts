import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {NewsMultilang} from "../../models/multilang/NewsMultilang";

@Injectable()
export class NewsMultilangProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/newsMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);  }

  create(newsMultilangs: any): Observable<NewsMultilang>{
    return this.http.post<NewsMultilang>(`${this.globalConfig.getGlobalHost()}/api/newsMultilangs`, newsMultilangs);
  }

  update(id:string, newsMultilangs: any): Observable<NewsMultilang>{
    return this.http.put<NewsMultilang>(`${this.globalConfig.getGlobalHost()}/api/newsMultilangs/${id}`, newsMultilangs);
  }

}
