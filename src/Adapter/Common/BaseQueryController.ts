import { Request, Response } from "express";
import { Query } from "../../App/CqrsModel/Query";
import { QueryBus } from "../../App/CqrsModel/QueryBus";
import { BaseController } from "./BaseController";

export abstract class BaseQueryController<
  TQuery,
  TQueryResponse
> extends BaseController {
  private queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    super();
    this.queryBus = queryBus;
  }

  protected async doHandleRequest<TQueryResponse>(
    req: Request,
    res: Response
  ): Promise<void> {
    const query: Query = await this.adaptRequest(req);
    const response: TQueryResponse = await this.queryBus.handle<TQueryResponse>(
      query
    );
    this.sendResponse<TQueryResponse>(res, response);
  }

  protected abstract adaptRequest(req: Request): Promise<Query>;

  private sendResponse<TQueryResponse>(
    res: Response<any, Record<string, any>>,
    response: TQueryResponse
  ) {
    res.status(200).json(response);
  }
}
