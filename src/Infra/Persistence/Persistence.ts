import { WatchListsRepository } from "../../App/Commands/Ports/WatchListsRepository";
import { WatchListProjections } from "../../App/Queries/Ports/WatchListProjections";

export interface Persistence {
  reset(): Promise<void>;
  getWatchListsRepository(): WatchListsRepository;
  getWatchListProjections(): WatchListProjections;
}
