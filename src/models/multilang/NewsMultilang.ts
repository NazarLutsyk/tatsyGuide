import {Lang} from "../lang/Lang";
import {Multilang} from "./Multilang";

export class NewsMultilang extends Multilang{
  constructor(
    public _id: string = '',
    public header: string = '',
    public description: string = '',
    public promo: string = '',
    public lang: Lang = null
  ) {
    super(lang);
  }
}
