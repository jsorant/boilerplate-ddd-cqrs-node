import { SharedMemory } from "./SharedMemory";
import { WatchListsRepository } from "../../../App/Commands/Ports/WatchListsRepository";
import { WatchList } from "../../../Domain/WatchList/WatchList";

export class InMemoryWatchListRepository implements WatchListsRepository {
  private sharedMemory: SharedMemory;

  constructor(sharedMemory: SharedMemory) {
    this.sharedMemory = sharedMemory;
  }

  async getFromName(name: string): Promise<WatchList | undefined> {
    return this.sharedMemory.findWatchListWithName(name);
  }

  async save(watchList: WatchList): Promise<void> {
    this.sharedMemory.removeWatchListWithName(watchList.name.value);
    this.sharedMemory.addWatchList(watchList);
  }
}
