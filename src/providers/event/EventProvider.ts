import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {host1, host2, lang} from "../../configs/GlobalVariables";
import {Platform} from "ionic-angular";

@Injectable()
export class EventProvider {
  private globalHost: string;

  constructor(public http: HttpClient, platform: Platform) {
    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }
  }

  getEvents(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalHost + `/api/events?target=${target}&fetch=${fetch}`);
  }


}
