import {Place} from "../place/Place";
import {KitchenMultilang} from "../multilang/KitchenMultilang";

export class Kitchen {
  constructor(
    public _id: string = '',
    public multilang: KitchenMultilang[] = [],
    public places: Place[] = []
  ) {
  }
}

