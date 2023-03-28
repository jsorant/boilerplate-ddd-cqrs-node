import { NextFunction, Request, Response } from "express";
import { WatchListsRepository } from "../App/Commands/Ports/WatchListsRepository";
import { TrackCity } from "../App/Commands/TrackCity";
import { TrackCityHandler } from "../App/Commands/TrackCityHandler";
import { DisplayWatchList } from "../App/Queries/DisplayWatchList";
import { DisplayWatchListHandler } from "../App/Queries/DisplayWatchListHandler";
import { WatchListProjector } from "../App/Queries/Ports/WatchListProjector";
import { WatchListProjection } from "../App/Queries/Views/WatchListProjection";

export class WatchListController {
  private watchListsRepository: WatchListsRepository;
  private watchListProjections: WatchListProjector;

  constructor(
    watchListsRepository: WatchListsRepository,
    watchListProjections: WatchListProjector
  ) {
    this.watchListsRepository = watchListsRepository;
    this.watchListProjections = watchListProjections;
  }

  async postTrackCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.handleExceptionsOn(res, async () => {
      await this.doPostTrackCity(req, res);
    });
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    await this.handleExceptionsOn(res, async () => {
      await this.doGet(req, res);
    });
  }

  private async handleExceptionsOn(res: Response, call: () => Promise<void>) {
    try {
      await call();
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }

  private async doGet(req: Request, res: Response): Promise<void> {
    // Adapt request
    const name: string = req.body.name;

    // Call domain
    const query: DisplayWatchList = new DisplayWatchList(name);
    const handler: DisplayWatchListHandler = new DisplayWatchListHandler(
      this.watchListProjections
    );
    const watchList: WatchListProjection = await handler.handle(query);

    // Format response
    res.status(200);
    res.json(watchList);
  }

  private async doPostTrackCity(req: Request, res: Response): Promise<void> {
    // Adapt request
    //const id = req.params.id;
    const { watchlist, name } = req.body;

    // Call domain
    const command: TrackCity = new TrackCity(watchlist, name);
    const handler: TrackCityHandler = new TrackCityHandler(
      this.watchListsRepository
    );
    await handler.handle(command);

    // Format response
    res.status(200);
    res.json({});
  }
}
