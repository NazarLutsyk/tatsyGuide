import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Observable} from "rxjs/Observable";
import {News} from "../../models/promo/news/News";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {fromPromise} from "rxjs/observable/fromPromise";

@Injectable()
export class NewsProvider {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigsService,
    private fileTransfer: FileTransfer
  ) {
  }

  find(request) {
    let url = this.globalConfig.getGlobalHost() + `/api/news?`;
    for (const key in request) {
      if (request[key]) {
        url += `${key}=${JSON.stringify(request[key])}&`;
      }
    }
    return this.http.get<any[]>(url);
  }

  create(news: any): Observable<News> {
    return this.http.post<News>(`${this.globalConfig.getGlobalHost()}/api/news`, news);
  }

  update(id: string, news: News): Observable<News> {
    return this.http.put<News>(`${this.globalConfig.getGlobalHost()}/api/news/${id}`, news);
  }


  upload(_id: any, image: string): Observable<any> {
    let url = `${this.globalConfig.getGlobalHost()}/api/news/${_id}`;
    if (image) {
      const transfer: FileTransferObject = this.fileTransfer.create();
      let options: FileUploadOptions = {
        fileKey: 'image',
        fileName: 'image',
        chunkedMode: false,
        mimeType: "image",
        httpMethod: 'put',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        //   'Accept': 'application/json'
        // }
      };
      return fromPromise(transfer.upload(image,url,options));
    } else {
      return new Observable<News>((subscriber) => subscriber.complete());
    }
  }


}
