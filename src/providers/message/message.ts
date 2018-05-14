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

  find(query = {}): Observable<Message[]> {
    let target = JSON.stringify({
      query: query
    });
    return this.http.get<Message[]>(`${this.globalConfig.getGlobalHost()}/api/messages?target=${target}`);
  }

  create(message: Message): Observable<Message>{
    return this.http.post<Message>(`${this.globalConfig.getGlobalHost()}/api/messages`, message);
  }

  update(id:string, message: Message): Observable<Message>{
    return this.http.put<Message>(`${this.globalConfig.getGlobalHost()}/api/messages/${id}`, message);
  }
}
