import { Command, CommandId } from "./Command";
import { CommandHandler } from "./CommandHandler";

export class CommandBus {
  private readonly handlers = new Map<CommandId, any>();

  registerHandler(id: CommandId, handler: any): void {
    this.handlers.set(id, handler);
  }

  async handle(command: Command): Promise<void> {
    const handler = this.findHandler(command) as CommandHandler<Command>;
    await handler.handle(command);
  }

  findHandler(command: Command): any {
    return this.handlers.get(command.id);
  }
}
