import {Multilang} from "./Multilang";
import {Lang} from "../lang/Lang";
import {Kitchen} from "../kitchen/Kitchen";

export class KitchenMultilang extends Multilang {
  constructor(
    public _id: string = '',
    public name: string = '',
    public kitchen: Kitchen = null,
    public lang: Lang = null
  ) {
    super(lang);
  }
}
