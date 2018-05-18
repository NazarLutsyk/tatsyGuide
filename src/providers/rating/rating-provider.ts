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

  getRatings(target = {}, fetch = {}): Observable<any[]> {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/ratings?target=${target}&fetch=${fetch}`);
  }

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
