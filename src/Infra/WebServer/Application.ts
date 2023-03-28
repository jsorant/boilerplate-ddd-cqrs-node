import bodyParser from "body-parser";
import express from "express";
import { DisplayWatchListController } from "../../Adapter/DisplayWatchListController";
import { TrackCityController } from "../../Adapter/TrackCityController";
import { WatchListsRepository } from "../../App/Commands/Ports/WatchListsRepository";
import { TrackCity } from "../../App/Commands/TrackCity";
import { TrackCityHandler } from "../../App/Commands/TrackCityHandler";
import { CommandBus } from "../../App/CqrsModel/CommandBus";
import { QueryBus } from "../../App/CqrsModel/QueryBus";
import { DisplayWatchList } from "../../App/Queries/DisplayWatchList";
import { DisplayWatchListHandler } from "../../App/Queries/DisplayWatchListHandler";
import { WatchListProjector } from "../../App/Queries/Ports/WatchListProjector";
import { InMemoryWatchListProjector } from "../Persistence/InMemory/InMemoryWatchListProjections";
import { InMemoryWatchListRepository } from "../Persistence/InMemory/InMemoryWatchListRepository";
import { SharedMemory } from "../Persistence/InMemory/SharedMemory";
import { ErrorHandler } from "./ErrorHandler";
import { makeWatchListRouter } from "./Routes/WatchListRouter";

export class Application {
  private expressApplication: express.Application;

  constructor() {
    this.expressApplication = express();

    // load middlewares
    this.expressApplication.use(bodyParser.urlencoded({ extended: true }));
    this.expressApplication.use(bodyParser.json());

    // load routes
    // TODO DI
    const sm: SharedMemory = new SharedMemory();
    const repo: WatchListsRepository = new InMemoryWatchListRepository(sm);
    const projs: WatchListProjector = new InMemoryWatchListProjector(sm);

    const commandBus = new CommandBus();
    commandBus.registerHandler(TrackCity.ID, new TrackCityHandler(repo));

    const queryBus = new QueryBus();
    queryBus.registerHandler(
      DisplayWatchList.ID,
      new DisplayWatchListHandler(projs)
    );

    const trackCityController: TrackCityController = new TrackCityController(
      commandBus
    );
    const displayWatchListController = new DisplayWatchListController(queryBus);

    const watchListRouter = makeWatchListRouter(
      trackCityController,
      displayWatchListController
    );
    this.expressApplication.use("/", watchListRouter);

    // generic error handler
    this.expressApplication.use(ErrorHandler);
  }

  start(port: number): void {
    this.expressApplication.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  }

  getExpressApplication(): express.Application {
    return this.expressApplication;
  }
}
