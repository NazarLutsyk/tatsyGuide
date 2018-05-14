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

  getDepartments(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/departments?target=${target}&fetch=${fetch}`);
  }

  create(department: Department): Observable<Department>{
    return this.http.post<Department>(`${this.globalConfig.getGlobalHost()}/api/departments`, department);
  }

  update(id:string, department: Department): Observable<Department>{
    return this.http.put<Department>(`${this.globalConfig.getGlobalHost()}/api/departments/${id}`, department);
  }


}
