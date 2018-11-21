import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Client} from "../../models/client/Client";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthProvider {

  principal: Subject<Client> = new Subject<Client>();

  constructor(
    private http: HttpClient,
    private globalVars: GlobalConfigsService,
  ) {
  }

  logIn(user): Observable<Client> {
    return this.http
      .post<Client>(`${this.globalVars.getGlobalHost()}/auth/local/signin`, user)
      .map((principal) => {
        this.principal.next(principal);
        return principal;
      });
  }

  loginByGoolge(token) {
    console.log("auth google", token);
    return this.http
      .post<Client>(`${this.globalVars.getGlobalHost()}/auth/google-native`, {access_token: token})
      .map((principal) => {
        this.principal.next(principal);
        return principal;
      });
  }


  loginByFacebook(token) {
    console.log(token);
    return this.http
      .post<Client>(`${this.globalVars.getGlobalHost()}/auth/facebook-native`, {access_token: token})
      .map((principal) => {
        this.principal.next(principal);
        return principal;
      });
  }


  logOut(): Observable<any> {
    return this.http.get(`${this.globalVars.getGlobalHost()}/auth/logout`);
  }

  registration(user): Observable<Client> {
    var obj = {name: user.name, surname: user.surname, email: user.email, login: user.login, password: user.password};
    return this.http
      .post<Client>(`${this.globalVars.getGlobalHost()}/auth/local/signup`, obj)
      .map((principal) => {
        this.principal.next(principal);
        return principal;
      });
  }

  loadPrincipal(request: any = {}): Observable<Client> {
    let url = this.globalVars.getGlobalHost() + `/auth/principal?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http
      .get<Client>(url)
      .map((principal) => {
        this.principal.next(principal);
        return principal;
      });
  }

  sendCode(email: string, login: string): Observable<boolean> {
    return this.http.post<boolean>(this.globalVars.getGlobalHost() + '/auth/generateRecoverCode', {email, login});
  }

  verifyCode(code: string): Observable<boolean> {
    return this.http.post<boolean>(this.globalVars.getGlobalHost() + '/auth/verifyRecoverCode', {code});
  }

  changePassword(login: string, email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.globalVars.getGlobalHost() + '/auth/changePassword', {password, email, login});
  }
}
