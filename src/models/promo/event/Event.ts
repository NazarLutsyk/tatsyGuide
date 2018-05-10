import {EventMultilang} from "./EventMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class Event extends Promo{
  translation: EventMultilang;


  constructor(id: string, image: string, author: Client, place: Place, translation: EventMultilang) {
    super(id, image, author, place);
    this.translation = translation;
  }
}
