import {NewsMultilang} from "./NewsMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class News extends Promo{
  translation: NewsMultilang;


  constructor(id: string, image: string, author: Client, place: Place, translation: NewsMultilang) {
    super(id, image, author, place);
    this.translation = translation;
  }
}
