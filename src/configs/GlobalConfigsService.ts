import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";

@Injectable()
export class GlobalConfigsService {
  private globalHost;
  public langs = [];
  public globalLang = '5b2cbc58fa9cd2ab1e737d2a';
  public globalPosition = {latitude: 0, longitude: 0};

  public deviceLang = '';

  constructor(
    private platform: Platform,
  ) {
    if (platform.is("android")) {
      this.globalHost = 'http://192.168.1.14:3000';
      // this.globalHost = 'http://ec2-18-222-181-7.us-east-2.compute.amazonaws.com';
    } else {
      this.globalHost = 'http://localhost:3000';
      // this.globalHost = 'http://ec2-18-222-181-7.us-east-2.compute.amazonaws.com';
    }
  }

  getGlobalHost(): string {
    return this.globalHost;
  }

  getGlobalLang() {
    // return this.deviceLang == 'ua' ? "5b2cbc58fa9cd2ab1e737d2a" : '5b2cbc5bfa9cd2ab1e737d2b'
    if (this.deviceLang.toLowerCase() === 'ua') {
      let uaLangIndex = this.langs.findIndex((value, index, obj) => {
          return value.name.toLowerCase() === 'ua'
      });
      return this.langs[uaLangIndex]._id;
    } else if(this.deviceLang.toLowerCase() === 'en'){
      let enLangIndex = this.langs.findIndex((value, index, obj) => {
        return value.name.toLowerCase() === 'en'
      });
      return this.langs[enLangIndex]._id;
    }else {
      return this.langs[0]._id;
    }
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
