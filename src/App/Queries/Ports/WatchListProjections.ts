import { WatchListProjection } from "../Views/WatchListProjection";

export interface WatchListProjections {
  getWatchList(name: string): Promise<WatchListProjection>;
}
