import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DrinkApplicationComment} from "../../models/drinkApplicationComment/DrinkApplicationComment";
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class DrinkApplicationCommentProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/drinkApplicationComments?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(drinkAppComment: any): Observable<DrinkApplicationComment> {
    return this.http.post<DrinkApplicationComment>(`${this.globalConfig.getGlobalHost()}/api/drinkApplicationComments`, drinkAppComment);
  }

  update(id: string, drinkAppComment: DrinkApplicationComment): Observable<DrinkApplicationComment> {
    return this.http.put<DrinkApplicationComment>(`${this.globalConfig.getGlobalHost()}/api/drinkApplicationComments/${id}`, drinkAppComment);
  }

  remove(_id: any) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/drinkApplicationComments/${_id}`);
  }
}
