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
    try {
      //const id = req.params.id;
      const { watchlist, name } = req.body;

      const command: TrackCity = new TrackCity(watchlist, name);
      const handler: TrackCityHandler = new TrackCityHandler(
        this.watchListsRepository
      );
      await handler.handle(command);

      // Format response
      res.status(200);
      res.json({});
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name: string = req.body.name;

      // Call use case
      const query: DisplayWatchList = new DisplayWatchList(name);
      const handler: DisplayWatchListHandler = new DisplayWatchListHandler(
        this.watchListProjections
      );
      const watchList: WatchListProjection = await handler.handle(query);

      // Format response
      res.status(200);
      res.json(watchList);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }
}
