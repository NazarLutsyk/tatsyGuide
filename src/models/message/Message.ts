import {Client} from "../client/Client";

export class Message {
  value: string;
  date: string;
  seen: boolean;
  sender: Client;
  receiver: Client;


  constructor(value: string, date: string, seen: boolean, sender: Client, receiver: Client) {
    this.value = value;
    this.date = date;
    this.seen = seen;
    this.sender = sender;
    this.receiver = receiver;
  }
}
