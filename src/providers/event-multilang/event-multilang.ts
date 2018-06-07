import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
// import {Event} from "../../models/promo/event/Event";
import {EventMultilang} from "../../models/multilang/EventMultilang";
// import {Complaint} from "../../models/complaint/Complaint";

@Injectable()
export class EventMultilangProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
    ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/eventMultilangs?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(eventM: any): Observable<EventMultilang>{
    return this.http.post<EventMultilang>(`${this.globalConfig.getGlobalHost()}/api/eventMultilangs`, eventM);
  }


  update(_id: any, eventMultilang: any): Observable<EventMultilang> {
    return this.http.put<EventMultilang>(`${this.globalConfig.getGlobalHost()}/api/eventMultilangs/${_id}`, eventMultilang);
  }
}
