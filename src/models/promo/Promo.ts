import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Promo {
  constructor(
    public id: string = '',
    public image: string = '',
    public startDate: string = '',
    public endDate: string = '',
    public topPromo: boolean = true,
    public author: Client = null,
    public place: Place = null,
  ) {
  }
}
