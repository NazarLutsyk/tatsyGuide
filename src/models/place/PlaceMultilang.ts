import {Place} from "./Place";

export class PlaceMultilang {
  _id: string;
  name: string;
  description: string;
  place: Place;


  constructor(id: string, name: string, description: string, place: Place) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.place = place;
  }
}
