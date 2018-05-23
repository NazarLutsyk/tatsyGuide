import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor{

  constructor(private http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let updatedRes = req.clone({
      withCredentials: true
    });
    return next.handle(updatedRes);
    // return next.handle(req);
  }


}
