import {Place} from "./Place";

export class PlaceMultilang {
  _id: string;
  name: string;
  description: string;
  place: Place;
  address: { city: string, street: string, number: string };


  constructor(id: string, name: string, description: string, place: Place , address: { city: string, street: string, number: string }) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.place = place;
    this.address = address;
  }
}
