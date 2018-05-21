import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HashTag} from "../../models/hashTag/HashTag";
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class HashTagProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/hashTags?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }


  create(hashTag: HashTag): Observable<HashTag>{
    return this.http.post<HashTag>(`${this.globalConfig.getGlobalHost()}/api/hashTags`, hashTag);
  }

  update(id:string, hashTag: HashTag): Observable<HashTag>{
    return this.http.put<HashTag>(`${this.globalConfig.getGlobalHost()}/api/hashTags/${id}`, hashTag);
  }

}
