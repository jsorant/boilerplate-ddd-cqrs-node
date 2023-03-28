import { NextFunction, Request, Response, Router } from "express";
import { DisplayWatchListController } from "../../Adapter/DisplayWatchListController";
import { TrackCityController } from "../../Adapter/TrackCityController";

export const makeRouter = (
  trackCityController: TrackCityController,
  displayWatchListController: DisplayWatchListController
): Router => {
  const eventsRouter: Router = Router();

  // Workaround as using commented version do not keep eventsController alive...
  // eventsRouter.post("/", eventsController.addNewEvent);
  // "/:id/trackcity",
  eventsRouter.post(
    "/trackcity",
    async (req: Request, res: Response, next: NextFunction) => {
      await trackCityController.handleRequest(req, res);
    }
  );

  // Workaround as using commented version do not keep eventsController alive...
  // eventsRouter.get("/:id", eventsController.getEvent);
  eventsRouter.get(
    "/watchList",
    async (req: Request, res: Response, next: NextFunction) => {
      await displayWatchListController.handleRequest(req, res);
    }
  );

  return eventsRouter;
};
