import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {KitchenMultilang} from "../../models/multilang/KitchenMultilang";

@Injectable()
export class KitchenMultilangProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }


  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/kitchenMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(kitchenMultilang: Object = {}): Observable<KitchenMultilang> {
    return this.http.post<KitchenMultilang>(`${this.globalConfig.getGlobalHost()}/api/kitchenMultilangs`, kitchenMultilang);
  }

  update(id: string, kitchenMultilang: KitchenMultilang): Observable<KitchenMultilang> {
    return this.http.put<KitchenMultilang>(`${this.globalConfig.getGlobalHost()}/api/kitchenMultilangs/${id}`, kitchenMultilang);
  }

  remove(_id: string): Observable<any> {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/kitchenMultilangs/${_id}`);
  }

}
