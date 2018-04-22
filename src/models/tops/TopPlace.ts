import {Place} from "../place/Place";

export class TopPlace {
  _id: string;
  startDate: string;
  endDate: string;
  price: number;
  actual: boolean;
  place: Place;
  
  constructor(id: string, startDate: string, endDate: string, price: number, actual: boolean, place: Place) {
    this._id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.actual = actual;
    this.place = place;
  }
}
