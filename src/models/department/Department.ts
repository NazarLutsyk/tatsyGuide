import {Client} from "../client/Client";
import {Place} from "../place/Place";

export class Department {

  constructor(
    public id: string = '',
    public roles: string[] = [],
    public client: Client = null,
    public place: Place = null
  ) {
  }
}
