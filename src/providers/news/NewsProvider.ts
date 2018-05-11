import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class NewsProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService) {
  }

  getNews(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/news?target=${target}&fetch=${fetch}`);
  }


}
