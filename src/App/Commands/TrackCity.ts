import { Command, CommandId } from "../CqrsModel/Command";

export class TrackCity implements Command {
  static ID: CommandId = "TrackCity";

  readonly id: string;
  readonly watchListName: string;
  readonly cityName: string;

  constructor(watchListName: string, cityName: string) {
    this.id = TrackCity.ID;
    this.watchListName = watchListName;
    this.cityName = cityName;
  }
}
