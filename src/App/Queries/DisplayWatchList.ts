import { Query } from "../CqrsModel/Query";

export class DisplayWatchList implements Query {
  readonly id: string;
  readonly name: string;

  constructor(name: string) {
    this.id = "DisplayWatchList";
    this.name = name;
  }
}
