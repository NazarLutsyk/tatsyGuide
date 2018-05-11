import {NewsMultilang} from "../../multilang/NewsMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class News extends Promo {

  constructor(
    public id: string = '',
    public image: string = '',
    public author: Client = null,
    public place: Place = null,
    public startDate: string = '',
    public endDate: string = '',
    public multilang: NewsMultilang = null
  ) {
    super(id, image, author, place, startDate, endDate);
  }
}
