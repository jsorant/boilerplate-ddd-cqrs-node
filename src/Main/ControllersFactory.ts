import { DisplayWatchListController } from "../Adapter/DisplayWatchListController";
import { TrackCityController } from "../Adapter/TrackCityController";
import { ComponentRegistry } from "./ComponentsRegistry";

export class ControllersFactory {
  private registry: ComponentRegistry;

  constructor(registry: ComponentRegistry) {
    this.registry = registry;
  }

  makeTrackCityController(): TrackCityController {
    return new TrackCityController(this.registry.commandBus);
  }

  makeDisplayWatchListController(): DisplayWatchListController {
    return new DisplayWatchListController(this.registry.queryBus);
  }
}
