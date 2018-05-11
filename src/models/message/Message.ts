import {Client} from "../client/Client";

export class Message {
  constructor(
    public value: string = '',
    public date: string = '',
    public seen: boolean = false,
    public sender: Client = null,
    public receiver: Client = null
  ) {
  }
}
