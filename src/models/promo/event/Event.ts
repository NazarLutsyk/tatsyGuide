import {EventMultilang} from "./EventMultilang";
import {Client} from "../../client/Client";
import {Place} from "../../place/Place";
import {Promo} from "../Promo";

export class Event extends Promo{
  translation: EventMultilang;


  constructor(id: string, images: string[], author: Client, place: Place, translation: EventMultilang) {
    super(id, images, author, place);
    this.translation = translation;
  }
}
