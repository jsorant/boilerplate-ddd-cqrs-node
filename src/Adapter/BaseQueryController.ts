import { NextFunction, Request, Response } from "express";
import { Query } from "../App/CqrsModel/Query";
import { QueryBus } from "../App/CqrsModel/QueryBus";

export abstract class BaseQueryController<TQuery, TQueryResponse> {
  private queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    await this.handleExceptionsOn(res, async () => {
      await this.doHandleRequest(req, res);
    });
  }

  private async doHandleRequest<TQueryResponse>(
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

  private async handleExceptionsOn(res: Response, call: () => Promise<void>) {
    try {
      await call();
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  private sendResponse<TQueryResponse>(
    res: Response<any, Record<string, any>>,
    response: TQueryResponse
  ) {
    res.status(200).json(response);
  }

  private sendError(res: Response<any, Record<string, any>>, error: any) {
    res.status(500).send({ error: error.message });
  }
}
