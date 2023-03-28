import { Request, Response } from "express";
import { Query } from "../../App/CqrsModel/Query";
import { QueryBus } from "../../App/CqrsModel/QueryBus";
import { BaseController } from "./BaseController";

export abstract class BaseQueryController extends BaseController {
  private queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    super();
    this.queryBus = queryBus;
  }

  protected async doHandleRequest(req: Request, res: Response): Promise<void> {
    const query: Query = await this.adaptRequest(req);
    const response = await this.queryBus.handle(query);
    this.sendResponse(res, response);
  }

  protected abstract adaptRequest(req: Request): Promise<Query>;

  private sendResponse(res: Response, response: any) {
    res.status(200).json(response);
  }
}
