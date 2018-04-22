export class NewsMultilang {
  _id: string;
  header: string;
  description: string;
  promo: string;

  constructor(id: string, header: string, description: string, promo: string) {
    this._id = id;
    this.header = header;
    this.description = description;
    this.promo = promo;
  }
}
