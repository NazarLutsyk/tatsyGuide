import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {App} from "ionic-angular";

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,
              private globalVars: GlobalConfigsService,
              private app: App
  ) {

  }

  logIn(user) {
    return this.http.post(`${this.globalVars.getGlobalHost()}/auth/local/signin`, user, {observe: 'response'})
  }

  logOut() {
    return this.http.get(`${this.globalVars.getGlobalHost()}/auth/logout`)

  }

  registration(user) {
    var obj = {name: user.name, surname: user.surname, email: user.email, login: user.login, password: user.password};
    return this.http.post(`${this.globalVars.getGlobalHost()}/auth/local/signup`, obj);


  }

}
