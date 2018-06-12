import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {LangProvider} from "../providers/lang/lang";

@Injectable()
export class GlobalConfigsService {
  private globalHost;
  private globalLang;
  public globalPosition = {latitude: 0, longitude: 0};

  constructor(
    private platform: Platform,
  ) {
    if (platform.is("android")) {
      this.globalHost = 'http://192.168.1.25:3000';
    } else {
      this.globalHost = 'http://localhost:3000';
    }
  }

  getGlobalHost(): string {
    return this.globalHost;
  }

  getGlobalLang() {

    if (this.globalLang.contains('ru') || this.globalLang.contains('RU') || this.globalLang.contains('ua') || this.globalLang.contains('UA')) {
      return "5b1e7e02749f5b3aa072ccf4";
    } else if (this.globalLang.contains('en') || this.globalLang.contains('EN')) {
      return "5b1e7e02749f5b3aa072ccf4"
    }
    return "5b1e7e02749f5b3aa072ccf4";


  }


  langChooser(lang) {
    lang = lang.toLowerCase();
    if (lang == 'ua') {
      return "5b1e7e02749f5b3aa072ccf4";
    } else if (lang == 'en') {

      return "5b1e7e02749f5b3aa072ccf4";
    }

  }


}
