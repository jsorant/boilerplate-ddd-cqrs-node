import { WatchList } from "../../Domain/WatchList/WatchList";
import { CommandHandler } from "../CqrsModel/CommandHandler";
import { WatchListsRepository } from "./Ports/WatchListsRepository";
import { TrackCity } from "./TrackCity";

export class TrackCityHandler implements CommandHandler<TrackCity> {
  private repository: WatchListsRepository;

  constructor(repository: WatchListsRepository) {
    this.repository = repository;
  }

  async handle(command: TrackCity): Promise<void> {
    const watchList: WatchList = await this.getOrCreateWatchList(
      command.watchListName
    );
    watchList.track(command.cityName);
    await this.saveWatchList(watchList);
  }

  private async getOrCreateWatchList(name: string): Promise<WatchList> {
    const watchList: WatchList | undefined = await this.repository.getFromName(
      name
    );
    if (watchList === undefined) {
      return WatchList.createNew(name);
    } else {
      return watchList;
    }
  }

  private async saveWatchList(watchList: WatchList): Promise<void> {
    await this.repository.save(watchList);
  }
}
