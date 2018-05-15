export class ObjectUtils {

  constructor() {
  }

  static isEmpty(obj: any) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }
}
