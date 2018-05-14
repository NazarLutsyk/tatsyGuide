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

  getEvents(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/events?target=${target}&fetch=${fetch}`);
  }

  create(event: Event): Observable<Event>{
    return this.http.post<Event>(`${this.globalConfig.getGlobalHost()}/api/events`, event);
  }

  update(id:string, event: Event): Observable<Event>{
    return this.http.put<Event>(`${this.globalConfig.getGlobalHost()}/api/events/${id}`, event);
  }


}
