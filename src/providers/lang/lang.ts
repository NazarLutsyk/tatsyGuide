import {HttpClient} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Lang} from "../../models/lang/Lang";

@Injectable()
export class LangProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/langs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(lang: Lang): Observable<Lang>{
    return this.http.post<Lang>(`${this.globalConfig.getGlobalHost()}/api/langs`, lang);
  }

  update(id:string, lang: Lang): Observable<Lang>{
    return this.http.put<Lang>(`${this.globalConfig.getGlobalHost()}/api/langs/${id}`, lang);
  }
}
