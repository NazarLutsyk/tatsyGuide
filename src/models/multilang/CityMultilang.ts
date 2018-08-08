import {Multilang} from "./Multilang";
import {Lang} from "../lang/Lang";
import {City} from "../city/City";

export class CityMultilang extends Multilang {
  constructor(
    public _id: string = '',
    public name: string = '',
    public city: City = null,
    public lang: Lang = null
  ) {
    super(lang);
  }
}
