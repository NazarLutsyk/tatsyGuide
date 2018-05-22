import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {News} from "../../models/promo/news/News";

@Injectable()
export class NewsProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/news?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(news: any): Observable<News> {
    return this.http.post<News>(`${this.globalConfig.getGlobalHost()}/api/news`, news);
  }

  update(id: string, news: News): Observable<News> {
    return this.http.put<News>(`${this.globalConfig.getGlobalHost()}/api/news/${id}`, news);
  }


  upload(_id: any, image: string): Observable<News> {
    let url = `https://localhost:3000/api/news/${_id}`;
    if (image) {
      let data = new FormData();
      data.append('image', image);
      return this.http.put<News>(url, data);
    } else {
      return new Observable<News>((subscriber) => subscriber.complete());
    }
  }


}
