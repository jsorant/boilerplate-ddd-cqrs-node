import { WatchListsRepository } from "../../App/Commands/Ports/WatchListsRepository";
import { WatchListProjector } from "../../App/Queries/Ports/WatchListProjector";

export interface Persistence {
  reset(): Promise<void>;
  getWatchListsRepository(): WatchListsRepository;
  getWatchListProjector(): WatchListProjector;
}
