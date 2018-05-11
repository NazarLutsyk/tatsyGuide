import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Rating {
  constructor(
    private id: string = '',
    private value: number = 0,
    private comment: string = '',
    private price: number = 0,
    private client: Client = null,
    private place: Place = null
  ) {
  }
}

