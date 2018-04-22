import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class DrinkApplication {
  _id: string;
  friends: string;
  goal: string;
  budged: number;
  date: string;
  organizer: Client;
  place: Place;

  constructor(id: string, friends: string, goal: string, budged: number, date: string, organizer: Client, place: Place) {
    this._id = id;
    this.friends = friends;
    this.goal = goal;
    this.budged = budged;
    this.date = date;
    this.organizer = organizer;
    this.place = place;
  }
}
