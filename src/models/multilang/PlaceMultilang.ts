import {Place} from "../place/Place";
import {Multilang} from "./Multilang";
import {Lang} from "../lang/Lang";

export class PlaceMultilang extends Multilang {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public place: Place = null,
    public address: {
      city: string,
      street: string,
      number: string
    } = {
      city: '',
      street: '',
      number: ''
    },
    public lang: Lang = null
  ) {
    super(lang);
  }
}
