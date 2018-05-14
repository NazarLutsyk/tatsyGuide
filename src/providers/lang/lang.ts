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

  find(query = {}): Observable<Lang[]> {
    let target = JSON.stringify({
      query: query
    });
    return this.http.get<Lang[]>(`${this.globalConfig.getGlobalHost()}/api/langs?target=${target}`);
  }

  create(lang: Lang): Observable<Lang>{
    return this.http.post<Lang>(`${this.globalConfig.getGlobalHost()}/api/langs`, lang);
  }

  update(id:string, lang: Lang): Observable<Lang>{
    return this.http.put<Lang>(`${this.globalConfig.getGlobalHost()}/api/langs/${id}`, lang);
  }
}
