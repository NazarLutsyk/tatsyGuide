import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Department} from "../../models/department/Department";

@Injectable()
export class DepartmentProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/departments?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(department: Department): Observable<Department>{
    return this.http.post<Department>(`${this.globalConfig.getGlobalHost()}/api/departments`, department);
  }

  update(id:string, department: Department): Observable<Department>{
    return this.http.put<Department>(`${this.globalConfig.getGlobalHost()}/api/departments/${id}`, department);
  }


}
