import { Request, Response } from "express";

export abstract class BaseController {
  async handleRequest(req: Request, res: Response): Promise<void> {
    await this.handleExceptionsOn(res, async () => {
      await this.doHandleRequest(req, res);
    });
  }

  protected abstract doHandleRequest(
    req: Request,
    res: Response
  ): Promise<void>;

  private async handleExceptionsOn(res: Response, call: () => Promise<void>) {
    try {
      await call();
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  private sendError(res: Response, error: any) {
    res.status(500).send({ error: error.message });
  }
}
