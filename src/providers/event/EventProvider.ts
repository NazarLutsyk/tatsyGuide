import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Event} from "../../models/promo/event/Event";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/events?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(event: Event): Observable<Event>{
    return this.http.post<Event>(`${this.globalConfig.getGlobalHost()}/api/events`, event);
  }

  update(id:string, event: Event): Observable<Event>{
    return this.http.put<Event>(`${this.globalConfig.getGlobalHost()}/api/events/${id}`, event);
  }


}
