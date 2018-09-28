import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Injectable()
export class DateTimePickerConfigProvider {

  constructor(
    public http: HttpClient,
    private translate: TranslateService,
    private globalConfig: GlobalConfigsService
  ) {
  }

  getShortMonths(): Observable<string[]> {
    return this.translate.get('dateTimePicker.shortMonths');
  }

  getMonths(): Observable<string[]> {
    return this.translate.get('dateTimePicker.fullMonths')
  }

}
