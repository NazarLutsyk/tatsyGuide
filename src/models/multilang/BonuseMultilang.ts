import {Bonuse} from "../promo/bonuse/Bonuse";
import {Multilang} from "./Multilang";
import {Lang} from "../lang/Lang";

export class BonuseMultilang extends Multilang {
  constructor(
    public _id: string = '',
    public header: string = '',
    public description: string = '',
    public conditions: string = '',
    public promo: Bonuse = null,
    public lang: Lang = null
  ) {
    super(lang);
  }
}
