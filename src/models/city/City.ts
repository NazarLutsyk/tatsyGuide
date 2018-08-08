import {Place} from "../place/Place";
import {CityMultilang} from "../multilang/CityMultilang";

export class City {
  constructor(
    public _id: string = '',
    public multilang: CityMultilang[] = [],
    public places: Place[] = []
  ) {
  }
}

