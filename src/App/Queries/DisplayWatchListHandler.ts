import { QueryHandler } from "../CqrsModel/QueryHandler";
import { DisplayWatchList } from "./DisplayWatchList";
import { WatchListProjections } from "./Ports/WatchListProjections";
import { WatchListProjection } from "./Views/WatchListProjection";

export class DisplayWatchListHandler
  implements QueryHandler<DisplayWatchList, WatchListProjection>
{
  private projections: WatchListProjections;

  constructor(projections: WatchListProjections) {
    this.projections = projections;
  }

  async handle(query: DisplayWatchList): Promise<WatchListProjection> {
    return await this.projections.getWatchList(query.name);
  }
}
