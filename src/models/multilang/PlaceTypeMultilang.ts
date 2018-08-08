import {PlaceType} from "../placeType/PlaceType";
import {Multilang} from "./Multilang";
import {Lang} from "../lang/Lang";

export class PlaceTypeMultilang extends Multilang {
  constructor(
    public _id: string = '',
    public name: string = '',
    public placeType: PlaceType = null,
    public lang: Lang = null
  ) {
    super(lang);
  }
}
