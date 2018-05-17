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
    //   this.globalHost = 'https://192.168.1.25:3000';
    // }else {
      this.globalHost = 'https://localhost:3000';
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
    return "5afd556852659f1c98a1d7f7";
  }

}
