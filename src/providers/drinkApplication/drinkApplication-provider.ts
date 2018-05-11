import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {Platform} from "ionic-angular";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class DrinkApplicationProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  getDrinkApplications(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost()+ `/api/drinkApplications?target=${target}&fetch=${fetch}`);
  }


}
