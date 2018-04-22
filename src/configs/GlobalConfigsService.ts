import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {host1, host2} from "./GlobalVariables";

@Injectable()
export class GlobalConfigsService {
  private globalHost = host1;

  constructor(platform: Platform) {
    if (platform.is("android")) {
      this.globalHost = host2
    }
  }

  getGlobalHost(): string {
    console.log(this.globalHost);
    return this.globalHost;
  }

}
