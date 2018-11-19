import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keyvalue',
})
export class KeyvaluePipe implements PipeTransform {
  transform(value: object, ...args) {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
