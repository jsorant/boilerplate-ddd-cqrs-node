import { QueryHandler } from "../CqrsModel/QueryHandler";
import { DisplayWatchList } from "./DisplayWatchList";
import { WatchListProjector } from "./Ports/WatchListProjector";
import { WatchListProjection } from "./Views/WatchListProjection";

export class DisplayWatchListHandler
  implements QueryHandler<DisplayWatchList, WatchListProjection>
{
  private projector: WatchListProjector;

  constructor(projector: WatchListProjector) {
    this.projector = projector;
  }

  async handle(query: DisplayWatchList): Promise<WatchListProjection> {
    return await this.projector.getWatchList(query.name);
  }
}
