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

  getNewsMultilangs(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/newsMultilangs?target=${target}&fetch=${fetch}`);
  }

  create(newsMultilangs: NewsMultilang): Observable<NewsMultilang>{
    return this.http.post<NewsMultilang>(`${this.globalConfig.getGlobalHost()}/api/newsMultilangs`, newsMultilangs);
  }

  update(id:string, newsMultilangs: NewsMultilang): Observable<NewsMultilang>{
    return this.http.put<NewsMultilang>(`${this.globalConfig.getGlobalHost()}/api/newsMultilangs/${id}`, newsMultilangs);
  }

}
