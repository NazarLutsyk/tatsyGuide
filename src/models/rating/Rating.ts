import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Rating {
  _id: string;
  value: number;
  comment: string;
  price:  number;
  client: Client;
  place: Place;

  constructor(id: string, value: number, comment: string, price: number, client: Client, place: Place) {
    this._id = id;
    this.value = value;
    this.comment = comment;
    this.price = price;
    this.client = client;
    this.place = place;
  }
}

