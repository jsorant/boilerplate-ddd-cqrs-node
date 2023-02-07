import { WatchList } from "../../../Domain/WatchList/WatchList";

export interface WatchListsRepository {
  getFromName(name: string): Promise<WatchList | undefined>;
  save(watchList: WatchList): Promise<void>;
}
