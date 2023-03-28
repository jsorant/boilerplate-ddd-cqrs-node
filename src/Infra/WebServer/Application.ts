import bodyParser from "body-parser";
import express from "express";
import { ControllersFactory } from "../../Main/ControllersFactory";
import { ErrorHandler } from "./ErrorHandler";
import { makeRouter } from "./Router";

export class Application {
  private expressApplication: express.Application;
  private controllersFactory: ControllersFactory;

  constructor(controllersFactory: ControllersFactory) {
    this.expressApplication = express();
    this.controllersFactory = controllersFactory;

    // load middlewares
    this.expressApplication.use(bodyParser.urlencoded({ extended: true }));
    this.expressApplication.use(bodyParser.json());

    // load routes
    const watchListRouter = makeRouter(
      controllersFactory.makeTrackCityController(),
      controllersFactory.makeDisplayWatchListController()
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
