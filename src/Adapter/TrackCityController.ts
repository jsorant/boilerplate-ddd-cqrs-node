import { Request } from "express";
import { Command } from "../App/CqrsModel/Command";
import { CommandBus } from "../App/CqrsModel/CommandBus";
import { BaseCommandController } from "./Common/BaseCommandController";
import { TrackCity } from "../App/Commands/TrackCity";

export class TrackCityController extends BaseCommandController {
  constructor(commandBus: CommandBus) {
    super(commandBus);
  }

  protected async adaptRequest(req: Request): Promise<Command> {
    //const id = req.params.id;
    const { watchlist, name } = req.body;

    return new TrackCity(watchlist, name);
  }
}
