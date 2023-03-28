import { Query, QueryId } from "./Query";
import { QueryHandler } from "./QueryHandler";

export class QueryBus {
  private readonly handlers = new Map<QueryId, any>();

  registerHandler(id: QueryId, handler: any): void {
    this.handlers.set(id, handler);
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
