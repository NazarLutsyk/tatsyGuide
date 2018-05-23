import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {Observable} from "rxjs/Observable";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {fromPromise} from "rxjs/observable/fromPromise";

@Injectable()
export class BonuseProvider {
  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService,
    private fileTransfer: FileTransfer
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/bonuses?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(bonuse: any): Observable<Bonuse> {
    return this.http.post<Bonuse>(`${this.globalConfig.getGlobalHost()}/api/bonuses`, bonuse);
  }

  update(id: string, bonuse: Bonuse): Observable<Bonuse> {
    return this.http.put<Bonuse>(`${this.globalConfig.getGlobalHost()}/api/bonuses/${id}`, bonuse);
  }

  upload(_id: any, image: string): Observable<any> {
    let url = `${this.globalConfig.getGlobalHost()}/api/bonuses/${_id}`;
    if (image) {
      const transfer: FileTransferObject = this.fileTransfer.create();
      let options: FileUploadOptions = {
        fileKey: 'image',
        fileName: 'image',
        chunkedMode: false,
        mimeType: "image",
        httpMethod: 'put',
      };
      return fromPromise(transfer.upload(image, url, options));
    } else {
      return new Observable<Bonuse>((subscriber) => subscriber.complete());
    }
  }

  remove(_id: any) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/bonuses/${_id}`);
  }
}
