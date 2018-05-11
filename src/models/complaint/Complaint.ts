import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Complaint {
  constructor(
    public id: string = '',
    public value: string = '',
    public client: Client = null,
    public place: Place = null
  ) {}
}
