import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Rating {
  constructor(
    public _id: string = '',
    public value: number = 0,
    public comment: string = '',
    public price: number = 0,
    public client: Client = null,
    public place: Place = null
  ) {
  }
}

