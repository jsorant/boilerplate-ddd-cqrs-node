import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";

export class QueryBus {
  private readonly handlers = new Map<string, any>();

  registerHandler(query: Query, handler: any): void {
    this.handlers.set(query.id, handler);
  }

  async handle<TQueryResponse>(query: Query): Promise<TQueryResponse> {
    const handler = this.findHandler(query) as QueryHandler<
      Query,
      TQueryResponse
    >;
    return await handler.handle(query);
  }

  findHandler(query: Query): any {
    return this.handlers.get(query.id);
  }
}
