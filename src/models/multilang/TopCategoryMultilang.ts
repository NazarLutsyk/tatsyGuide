import {Multilang} from "./Multilang";
import {Lang} from "../lang/Lang";
import {TopCategory} from "../topCategory/TopCategory";

export class TopCategoryMultilang extends Multilang {
  constructor(
    public _id: string = '',
    public name: string = '',
    public topCategory: TopCategory = null,
    public lang: Lang = null
  ) {
    super(lang);
  }
}
