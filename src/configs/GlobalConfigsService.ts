import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";

@Injectable()
export class GlobalConfigsService {
  private globalHost;
  public langs = [];
  public globalLang = '5b1e7e02749f5b3aa072ccf4';
  public globalPosition = {latitude: 0, longitude: 0};

  public deviceLang /*= "ua"*/;

  constructor(
    private platform: Platform,
  ) {
    if (platform.is("android")) {
      // this.globalHost = 'http://192.168.0.4:3000';
      this.globalHost = 'http://192.168.1.33:3000';
      // this.globalHost = 'http://localhost:3000';
    } else {
      this.globalHost = 'http://localhost:3000';
    }
    console.log(this.globalHost);
  }

  getGlobalHost(): string {
    return this.globalHost;
  }

  getGlobalLang() {
    return this.deviceLang == 'ua' ? "5b1e7e02749f5b3aa072ccf4" : '5b1e7e03749f5b3aa072ccf5'
  }


  // langChooser(lang) {
  //   lang = lang.toLowerCase();
  //   if (lang == 'ua') {
  //     return "5b1e7e02749f5b3aa072ccf4";
  //   } else if (lang == 'en') {
  //
  //     return "5b1e7e03749f5b3aa072ccf5";
  //   }
  //
  // }


}
