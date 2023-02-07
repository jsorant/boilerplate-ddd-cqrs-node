import { WatchListProjections } from "../../../App/Queries/Ports/WatchListProjections";
import {
  CityProjection,
  WatchListProjection,
} from "../../../App/Queries/Views/WatchListProjection";
import { CityName } from "../../../Domain/WatchList/ValueObjects/CityName";
import { WatchList } from "../../../Domain/WatchList/WatchList";
import { SharedMemory } from "./SharedMemory";

export class InMemoryWatchListProjections implements WatchListProjections {
  private sharedMemory: SharedMemory;

  constructor(sharedMemory: SharedMemory) {
    this.sharedMemory = sharedMemory;
  }

  async getWatchList(name: string): Promise<WatchListProjection> {
    const watchList: WatchList =
      this.sharedMemory.findWatchListFromNameOrThrow(name);
    return this.adaptToWatchListProjection(watchList);
  }

  private adaptToWatchListProjection(
    watchList: WatchList
  ): WatchListProjection {
    return {
      name: watchList.name.value,
      cityProjections: watchList.cities.map((cityName) =>
        this.adaptToCityProjection(cityName)
      ),
    };
  }

  private adaptToCityProjection(cityName: CityName): CityProjection {
    return {
      name: cityName.value,
    };
  }
}
