import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";

@Injectable()
export class DrinkApplicationProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/drinkApplications?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(drinkApplication: DrinkApplication): Observable<DrinkApplication>{
    return this.http.post<DrinkApplication>(`${this.globalConfig.getGlobalHost()}/api/drinkApplications`, drinkApplication);
  }

  update(id:string, drinkApplication: DrinkApplication): Observable<DrinkApplication>{
    return this.http.put<DrinkApplication>(`${this.globalConfig.getGlobalHost()}/api/drinkApplications/${id}`, drinkApplication);
  }

}
