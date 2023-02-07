import { WatchList } from "../../../Domain/WatchList/WatchList";

export class SharedMemory {
  private watchLists: Array<WatchList> = [];

  reset() {
    this.watchLists = [];
  }

  // Helpers:

  findWatchListFromNameOrThrow(name: string): WatchList {
    const watchList: WatchList | undefined = this.findWatchListWithName(name);

    if (watchList === undefined) {
      throw new Error("Watchlist not found for name: " + name);
    }

    return watchList;
  }

  findWatchListWithName(name: string): WatchList | undefined {
    return this.watchLists.find((watchList) => watchList.name.value === name);
  }

  removeWatchListWithName(name: string): void {
    this.watchLists = this.watchLists.filter(
      (watchList: WatchList) => watchList.name.value !== name
    );
  }

  addWatchList(watchList: WatchList) {
    this.watchLists.push(watchList);
  }
}
