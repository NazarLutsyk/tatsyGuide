import {BonuseMultilang} from "../../multilang/BonuseMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class Bonuse extends Promo {
  constructor(
    public id: string = '',
    public image: string = '',
    public author: Client = null,
    public place: Place = null,
    public startDate: string = '',
    public endDate: string = '',
    public multilang: BonuseMultilang[] = []
  ) {
    super(id, image, author, place, startDate, endDate);
  }
}
