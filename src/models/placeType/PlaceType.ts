import {PlaceTypeMultilang} from "../multilang/PlaceTypeMultilang";
import {Place} from "../place/Place";

export class PlaceType {
  constructor(
    public id: string = '',
    public multilang: PlaceTypeMultilang[] = [],
    public places: Place[] = []
  ) {
  }

  public getMultilang(){
    console.log(this.multilang);
  }
}

