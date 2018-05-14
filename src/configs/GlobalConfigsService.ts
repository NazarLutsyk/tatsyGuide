import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {AuthProvider} from "../providers/auth/auth";
import {Observable} from "rxjs/Observable";
import {Client} from "../models/client/Client";

@Injectable()
export class GlobalConfigsService {
  private globalHost;
  private globalLang;

  constructor(
    private platform: Platform,
  ) {
    // todo
    // if (platform.is("android")) {
    //   this.globalHost = 'https://192.168.1.25:3000';
    // }else {
      this.globalHost = 'https://localhost:3000';
    // }
  }

  getGlobalHost(): string {
    return this.globalHost;
  }

  getGlobalLang() {
    this.globalLang = '5af86bf70dfc611c94549a9f';
    return this.globalLang;
  }

}
