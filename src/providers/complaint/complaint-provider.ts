import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {Complaint} from "../../models/complaint/Complaint";


@Injectable()
export class ComplaintProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService
  ) {
  }

  getComplaints(target = {}, fetch = {}) {
    target = JSON.stringify(target);
    fetch = JSON.stringify(fetch);
    return this.http.get<any[]>(this.globalConfig.getGlobalHost() + `/api/complaints?target=${target}&fetch=${fetch}`);
  }

  create(complaint: Complaint): Observable<Complaint>{
    return this.http.post<Complaint>(`${this.globalConfig.getGlobalHost()}/api/complaints`, complaint);
  }

  update(id:string, complaint: Complaint): Observable<Complaint>{
    return this.http.put<Complaint>(`${this.globalConfig.getGlobalHost()}/api/complaints/${id}`, complaint);
  }


}
