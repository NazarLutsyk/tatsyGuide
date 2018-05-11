import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class DrinkApplication {
  constructor(
    public id: string = '',
    public friends: string = '',
    public goal: string = '',
    public budged: number = 0,
    public date: string = '',
    public organizer: Client = null,
    public place: Place = null
  ) {
  }
}
