import { Query } from "../CqrsModel/Query";

export class DisplayWatchList implements Query {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
