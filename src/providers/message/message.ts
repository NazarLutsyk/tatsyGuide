import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Message} from "../../models/message/Message";
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class MessageProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/messages?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(message: Message): Observable<Message>{
    return this.http.post<Message>(`${this.globalConfig.getGlobalHost()}/api/messages`, message);
  }

  update(id:string, message: Message): Observable<Message>{
    return this.http.put<Message>(`${this.globalConfig.getGlobalHost()}/api/messages/${id}`, message);
  }
}
