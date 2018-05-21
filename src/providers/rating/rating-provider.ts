import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Rating} from "../../models/rating/Rating";

@Injectable()
export class RatingProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/ratings?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);  }

  create(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.globalConfig.getGlobalHost()}/api/ratings`, rating);
  }

  update(id: string, rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(`${this.globalConfig.getGlobalHost()}/api/ratings/${id}`, rating);
  }

  remove(id: string) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/ratings/${id}`).subscribe();
  }


}
