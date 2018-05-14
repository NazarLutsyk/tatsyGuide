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

  getHashTags(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/hashTags?target=${target}&fetch=${fetch}`);
  }


  create(hashTag: HashTag): Observable<HashTag>{
    return this.http.post<HashTag>(`${this.globalConfig.getGlobalHost()}/api/hashTags`, hashTag);
  }

  update(id:string, hashTag: HashTag): Observable<HashTag>{
    return this.http.put<HashTag>(`${this.globalConfig.getGlobalHost()}/api/hashTags/${id}`, hashTag);
  }

}
