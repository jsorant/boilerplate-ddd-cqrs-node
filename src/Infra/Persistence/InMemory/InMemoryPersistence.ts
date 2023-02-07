import { WatchListsRepository } from "../../../App/Commands/Ports/WatchListsRepository";
import { WatchListProjections } from "../../../App/Queries/Ports/WatchListProjections";
import { Persistence } from "../Persistence";
import { InMemoryWatchListProjections } from "./InMemoryFleetProjections";
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

  getWatchListProjections(): WatchListProjections {
    return new InMemoryWatchListProjections(this.sharedMemory);
  }
}
