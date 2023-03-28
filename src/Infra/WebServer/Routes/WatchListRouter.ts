import { NextFunction, Request, Response, Router } from "express";
import { DisplayWatchListController } from "../../../Adapter/DisplayWatchListController";
import { WatchListController } from "../../../Adapter/WatchListController";

export const makeWatchListRouter = (
  controller: WatchListController,
  displayWatchListController: DisplayWatchListController
): Router => {
  const eventsRouter: Router = Router();

  // Workaround as using commented version do not keep eventsController alive...
  // eventsRouter.post("/", eventsController.addNewEvent);
  // "/:id/trackcity",
  eventsRouter.post(
    "/trackcity",
    async (req: Request, res: Response, next: NextFunction) => {
      await controller.postTrackCity(req, res, next);
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
