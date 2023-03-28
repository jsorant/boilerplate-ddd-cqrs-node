import { WatchListProjection } from "../Views/WatchListProjection";

export interface WatchListProjector {
  getWatchList(name: string): Promise<WatchListProjection>;
}
