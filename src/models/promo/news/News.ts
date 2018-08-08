import {NewsMultilang} from "../../multilang/NewsMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class News extends Promo {

  constructor(
    public _id: string = '',
    public image: string = '',
    public author: Client = null,
    public place: Place = null,
    public topPromo: boolean = true,
    public startDate: string = '',
    public endDate: string = '',
    public multilang: NewsMultilang[] = []
  ) {
    super(_id, image, startDate, endDate, topPromo, author, place);
  }
}
