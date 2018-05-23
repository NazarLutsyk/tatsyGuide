import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {LangProvider} from "../providers/lang/lang";

@Injectable()
export class GlobalConfigsService {
  private globalHost;
  private globalLang;
  public langService: LangProvider;

  constructor(
    private platform: Platform,
  ) {
    // if (platform.is("android")) {
    //   this.globalHost = 'http://192.168.1.14:3000';
    // }else {
      this.globalHost = 'http://localhost:3000';
    // }
  }

  getGlobalHost(): string {
    return this.globalHost;
  }

  getGlobalLang() {
    // if (!this.globalLang) {
    //   this.langService.find({name: "ukr"}).subscribe(([lang]) => {
    //     this.globalLang = lang;
    //   });
    // }
    // return this.globalLang;
    return "5b02ba1c5a981e2c38037c9c";
  }

}
