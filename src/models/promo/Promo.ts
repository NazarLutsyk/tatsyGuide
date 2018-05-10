import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Promo {
  _id: string;
  image: string;
  author: Client;
  place: Place;


  constructor(id: string, image: string, author: Client, place: Place) {
    this._id = id;
    this.image = image;
    this.author = author;
    this.place = place;
  }
}
