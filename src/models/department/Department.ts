import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Department {
  _id: string;
  roles: string[];
  client: Client;
  place: Place;

  constructor(id: string, roles: string[], client: Client, place: Place) {
    this._id = id;
    this.roles = roles;
    this.client = client;
    this.place = place;
  }
}
