import { Request } from "express";
import { Query } from "../App/CqrsModel/Query";
import { QueryBus } from "../App/CqrsModel/QueryBus";
import { DisplayWatchList } from "../App/Queries/DisplayWatchList";
import { WatchListProjection } from "../App/Queries/Views/WatchListProjection";
import { BaseQueryController } from "./BaseQueryController";

export class DisplayWatchListController extends BaseQueryController<
  DisplayWatchList,
  WatchListProjection
> {
  constructor(queryBus: QueryBus) {
    super(queryBus);
  }

  protected async adaptRequest(req: Request): Promise<Query> {
    const name: string = req.body.name;
    return new DisplayWatchList(name);
  }
}
