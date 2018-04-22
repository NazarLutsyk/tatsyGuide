import {BonuseMultilang} from "./BonuseMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class Bonuse extends Promo{
  startDate: string;
  endDate: string;
  translation: BonuseMultilang;


  constructor(id: string, images: string[], author: Client, place: Place, startDate: string, endDate: string, translation: BonuseMultilang) {
    super(id, images, author, place);
    this.startDate = startDate;
    this.endDate = endDate;
    this.translation = translation;
  }
}
