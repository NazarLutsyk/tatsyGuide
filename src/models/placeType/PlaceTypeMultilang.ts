import {PlaceType} from "./PlaceType";

export class PlaceTypeMultilang {
  _id: string;
  name: string;
  placeType: PlaceType;


  constructor(id: string, name: string, placeType: PlaceType) {
    this._id = id;
    this.name = name;
    this.placeType = placeType;
  }
}
