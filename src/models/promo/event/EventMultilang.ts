export class EventMultilang {
  _id: String;
  header: string;
  description: string;
  promo: string;

  constructor(id: String, header: string, description: string, promo: string) {
    this._id = id;
    this.header = header;
    this.description = description;
    this.promo = promo;
  }
}
