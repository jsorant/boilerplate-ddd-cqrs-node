import { Command } from "../CqrsModel/Command";

export class TrackCity implements Command {
  readonly watchListName: string;
  readonly cityName: string;

  constructor(watchListName: string, cityName: string) {
    this.watchListName = watchListName;
    this.cityName = cityName;
  }
}
