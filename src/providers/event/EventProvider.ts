import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Event} from "../../models/promo/event/Event";
import {Observable} from "rxjs/Observable";
import {Place} from "../../models/place/Place";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {fromPromise} from "rxjs/observable/fromPromise";

@Injectable()
export class EventProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService,
    private fileTransfer: FileTransfer
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/events?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(event: any): Observable<Event> {
    return this.http.post<Event>(`${this.globalConfig.getGlobalHost()}/api/events`, event);
  }

  update(id: string, event: any): Observable<Event> {
    return this.http.put<Event>(`${this.globalConfig.getGlobalHost()}/api/events/${id}`, event);
  }

//todo test that shit
  upload(_id: any, image: string): Observable<Event> {
    let url = `https://localhost:3000/api/events/${_id}`;
    console.log(image);
    if (image) {
      let data = new FormData();
      data.append('image', image);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.put<Event>(url, data, {headers: headers});
    } else {
      return new Observable<Event>((subscriber) => subscriber.complete());
    }
  }

  // upload(_id: any, image: string): Observable<any> {
  //   let url = `${this.globalConfig.getGlobalHost()}/api/events/${_id}`;
  //   if (image) {
  //     const transfer: FileTransferObject = this.fileTransfer.create();
  //     let options: FileUploadOptions = {
  //       fileKey: 'image',
  //       fileName: 'image',
  //       chunkedMode: false,
  //       mimeType: "image",
  //       httpMethod: 'put',
  //     };
  //     return fromPromise(transfer.upload(image, url, options));
  //   } else {
  //     return new Observable<Event>((subscriber) => subscriber.complete());
  //   }
  // }
  remove(_id: any) {
    return this.http.delete(`${this.globalConfig.getGlobalHost()}/api/events/${_id}`);
  }
}
