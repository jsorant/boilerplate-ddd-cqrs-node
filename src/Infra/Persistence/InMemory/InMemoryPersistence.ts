import { WatchListsRepository } from "../../../App/Commands/Ports/WatchListsRepository";
import { WatchListProjector } from "../../../App/Queries/Ports/WatchListProjector";
import { Persistence } from "../Persistence";
import { InMemoryWatchListProjector } from "./InMemoryWatchListProjections";
import { InMemoryWatchListRepository } from "./InMemoryWatchListRepository";
import { SharedMemory } from "./SharedMemory";

export class InMemoryPersistence implements Persistence {
  private sharedMemory: SharedMemory = new SharedMemory();

  async reset(): Promise<void> {
    this.sharedMemory.reset();
  }

  getWatchListsRepository(): WatchListsRepository {
    return new InMemoryWatchListRepository(this.sharedMemory);
  }

  getWatchListProjector(): WatchListProjector {
    return new InMemoryWatchListProjector(this.sharedMemory);
  }
}
