import { TrackCity } from "../App/Commands/TrackCity";
import { TrackCityHandler } from "../App/Commands/TrackCityHandler";
import { CommandBus } from "../App/CqrsModel/CommandBus";
import { QueryBus } from "../App/CqrsModel/QueryBus";
import { DisplayWatchList } from "../App/Queries/DisplayWatchList";
import { DisplayWatchListHandler } from "../App/Queries/DisplayWatchListHandler";
import { InMemoryPersistence } from "../Infra/Persistence/InMemory/InMemoryPersistence";
import { Persistence } from "../Infra/Persistence/Persistence";

export class ComponentRegistry {
  readonly persistence: Persistence;
  readonly commandBus: CommandBus;
  readonly queryBus: QueryBus;

  constructor() {
    this.persistence = this.makePersistence();
    this.commandBus = this.makeCommandBus();
    this.queryBus = this.makeQueryBus();
  }

  private makePersistence(): Persistence {
    // TODO enable switch persistence type
    return new InMemoryPersistence();
  }

  private makeCommandBus(): CommandBus {
    const commandBus = new CommandBus();
    commandBus.registerHandler(
      TrackCity.ID,
      new TrackCityHandler(this.persistence.getWatchListsRepository())
    );
    return commandBus;
  }

  private makeQueryBus(): QueryBus {
    const queryBus = new QueryBus();
    queryBus.registerHandler(
      DisplayWatchList.ID,
      new DisplayWatchListHandler(this.persistence.getWatchListProjector())
    );
    return queryBus;
  }
}
