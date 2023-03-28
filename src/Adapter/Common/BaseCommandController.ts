import { Request, Response } from "express";
import { Command } from "../../App/CqrsModel/Command";
import { CommandBus } from "../../App/CqrsModel/CommandBus";
import { BaseController } from "./BaseController";

export abstract class BaseCommandController extends BaseController {
  private commandBus: CommandBus;

  constructor(commandBus: CommandBus) {
    super();
    this.commandBus = commandBus;
  }

  protected async doHandleRequest(req: Request, res: Response): Promise<void> {
    const command: Command = await this.adaptRequest(req);
    await this.commandBus.handle(command);
    this.sendResponse(res);
  }

  protected abstract adaptRequest(req: Request): Promise<Command>;

  private sendResponse(res: Response<any, Record<string, any>>) {
    res.status(200).json({});
  }
}
