import { Request } from "express";
import { Query } from "../App/CqrsModel/Query";
import { QueryBus } from "../App/CqrsModel/QueryBus";
import { BaseQueryController } from "./Common/BaseQueryController";
import { DisplayWatchList } from "../App/Queries/DisplayWatchList";

export class DisplayWatchListController extends BaseQueryController {
  constructor(queryBus: QueryBus) {
    super(queryBus);
  }

  protected async adaptRequest(req: Request): Promise<Query> {
    const name: string = req.body.name;
    return new DisplayWatchList(name);
  }
}
