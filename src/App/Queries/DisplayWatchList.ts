import { Query, QueryId } from "../CqrsModel/Query";

export class DisplayWatchList implements Query {
  static ID: QueryId = "DisplayWatchList";

  readonly id: string;
  readonly name: string;

  constructor(name: string) {
    this.id = DisplayWatchList.ID;
    this.name = name;
  }
}
