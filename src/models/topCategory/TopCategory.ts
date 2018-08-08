import {Place} from "../place/Place";
import {TopCategoryMultilang} from "../multilang/TopCategoryMultilang";

export class TopCategory {
  constructor(
    public _id: string = '',
    public multilang: TopCategoryMultilang[] = [],
    public places: Place[] = []
  ) {
  }
}

