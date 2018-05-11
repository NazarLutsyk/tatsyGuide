import {PlaceTypeMultilang} from "../multilang/PlaceTypeMultilang";

export class PlaceType {
  constructor(
    public id: string = '',
    public multilang: PlaceTypeMultilang = null
  ) {
  }

  public getMultilang(){
    console.log(this.multilang);
  }
}

