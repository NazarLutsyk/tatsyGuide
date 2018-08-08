import {EventMultilang} from "../../multilang/EventMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class Event extends Promo {


  constructor(
    public _id: string = '',
    public image: string = '',
    public author: Client = null,
    public place: Place = null,
    public startDate: string = '',
    public endDate: string = '',
    public topPromo: boolean = true,
    public multilang: EventMultilang[] = []
  ) {
    super(_id, image, startDate, endDate, topPromo, author, place);
  }
}
