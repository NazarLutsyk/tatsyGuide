import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class MailProvider {

  constructor(
    public http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  sendMail(data: { from: string, message: string, to: string}): Observable<any> {
    return this.http.post(`${this.globalConfig.getGlobalHost()}/mail/send`, data);
  }

}
