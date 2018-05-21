import {Place} from "../place/Place";

export class HashTag {
  constructor(
    public id: string = '',
    public value: string = '',
    public places: Place[] = []
  ) {
  }
}
