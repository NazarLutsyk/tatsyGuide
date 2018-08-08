import {Place} from "../place/Place";

export class TopPlace {
  constructor(
    public _id: string = '',
    public startDate: string = '',
    public endDate: string = '',
    public price: number = 0,
    public actual: boolean = false,
    public place: Place = null
  ) {
  }
}
