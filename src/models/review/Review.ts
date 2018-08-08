import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Review {
  constructor(
    public _id: string = '',
    public createdAt: string = '',
    public client: Client = null,
    public place: Place = null,
  ){}
}
