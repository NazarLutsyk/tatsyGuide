import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Event} from "../../models/promo/event/Event";
import {Observable} from "rxjs/Observable";
import {Place} from "../../models/place/Place";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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

  create(event: any): Observable<Event> {
    return this.http.post<Event>(`${this.globalConfig.getGlobalHost()}/api/events`, event);
  }

  update(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.globalConfig.getGlobalHost()}/api/events/${id}`, event);
  }


  upload(_id: any, image: string): Observable<Event> {
    let url = `https://localhost:3000/api/events/${_id}`;
    if (image) {
      let data = new FormData();
      data.append('image', image);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.put<Event>(url, data , {headers: headers});
    } else {
      return new Observable<Event>((subscriber) => subscriber.complete());
    }
  }
}
