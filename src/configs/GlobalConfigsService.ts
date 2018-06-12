import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {LangProvider} from "../providers/lang/lang";

@Injectable()
export class GlobalConfigsService {
  private globalHost;
  private globalLang;
  public globalPosition = {latitude: 0, longitude: 0};
  public langService: LangProvider;

  constructor(
    private platform: Platform,
  ) {
    if (platform.is("android")) {
      this.globalHost = 'http://192.168.1.11:3000';
    } else {
      this.globalHost = 'http://localhost:3000';
    }
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
    return "5b11542ecbfbd41238641da2";
  }


  langChooser(lang) {
    lang = lang.toLowerCase();
    if (lang == 'ua') {
      return "5b11542ecbfbd41238641da2";
    } else if (lang == 'en') {
      return "5b11542fcbfbd41238641da3";
    }

  }


}
