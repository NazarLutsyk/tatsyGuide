import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Promo {
  constructor(
    public id: string = '',
    public image: string = '',
    public author: Client = null,
    public place: Place = null,
    public startDate: string = '',
    public endDate: string = '',
  ) {
  }
}
