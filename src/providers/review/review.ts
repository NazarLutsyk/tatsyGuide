import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ReviewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ReviewProvider Provider');
  }

}
