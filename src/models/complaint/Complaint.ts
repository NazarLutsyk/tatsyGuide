import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Complaint {
  _id: string;
  value: string;
  client: Client;
  place: Place;

  constructor(id: string, value: string, client: Client, place: Place) {
    this._id = id;
    this.value = value;
    this.client = client;
    this.place = place;
  }
}
