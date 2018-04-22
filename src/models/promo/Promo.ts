import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Promo {
  _id: string;
  images: string[];
  author: Client;
  place: Place;


  constructor(id: string, images: string[], author: Client, place: Place) {
    this._id = id;
    this.images = images;
    this.author = author;
    this.place = place;
  }
}
