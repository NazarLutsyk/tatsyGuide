import {PlaceTypeMultilang} from "./PlaceTypeMultilang";

export class PlaceType {
  _id: string;
  multilang: PlaceTypeMultilang;


  constructor(id: string, multilang: PlaceTypeMultilang) {
    this._id = id;
    this.multilang = multilang;
  }

  public getMultilang(){
    console.log(this.multilang);
  }
}

