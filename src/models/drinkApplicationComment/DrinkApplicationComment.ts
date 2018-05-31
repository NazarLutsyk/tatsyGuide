import {Client} from "../client/Client";
import {DrinkApplication} from "../drinkApplication/DrinkApplication";

export class DrinkApplicationComment {
  constructor(
    public value: string = '',
    public createdAt: string = '',
    public sender: Client = null,
    public drinkApplication: DrinkApplication = null
  ) {
  }
}
