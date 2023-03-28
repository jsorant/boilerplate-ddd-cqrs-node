import assert from "assert";
import { Given, When, Then, Before } from "@cucumber/cucumber";

import { assertIsAnErrorWithMessage } from "./TestTools";
import {
  createForcedOrSqlite3Persistence,
  createForcedOrInMemoryPersistence,
} from "./TestsPersistenceFactory";
import { TrackCity } from "../../src/App/Commands/TrackCity";
import { TrackCityHandler } from "../../src/App/Commands/TrackCityHandler";
import { WatchListsRepository } from "../../src/App/Commands/Ports/WatchListsRepository";
import { WatchListProjector } from "../../src/App/Queries/Ports/WatchListProjector";
import { DisplayWatchList } from "../../src/App/Queries/DisplayWatchList";
import { WatchListProjection } from "../../src/App/Queries/Views/WatchListProjection";
import { DisplayWatchListHandler } from "../../src/App/Queries/DisplayWatchListHandler";

Before({ tags: "@critical" }, async function () {
  await createForcedOrSqlite3Persistence(this);
});

Before({ tags: "not @critical" }, async function () {
  await createForcedOrInMemoryPersistence(this);
});

Given("a city", function () {
  this.cityName = "Lyon";
});

Given("a watchlist", function () {
  this.watchListName = "My cities";
});

Given("another watchlist", function () {
  this.anotherWatchListName = "Other cities";
});

Given("I have added the city to the watchlist", async function () {
  await trackCity(this.watchListName, this.cityName, this.watchListsRepository);
});

Given("the city have been added to the other watchlist", async function () {
  await trackCity(
    this.anotherWatchListName,
    this.cityName,
    this.watchListsRepository
  );
});

When("I add the city to the watchlist", async function () {
  await trackCity(this.watchListName, this.cityName, this.watchListsRepository);
});

When("I try to add this city to the watchlist again", async function () {
  try {
    await trackCity(
      this.watchListName,
      this.cityName,
      this.watchListsRepository
    );
  } catch (error: any) {
    this.lastError = error;
  }
});

Then("I should be able to obtain the meteo of this city", async function () {
  const watchList: WatchListProjection = await displayWatchList(
    this.watchListName,
    this.watchListProjections
  );
  assert.strictEqual(watchList.name, this.watchListName);
  assert.strictEqual(
    watchList.cityProjections.length,
    1,
    "Exactely one city should be tracked"
  );
  assert.strictEqual(
    watchList.cityProjections[0].name,
    this.cityName,
    `City '${this.cityName}' should be tracked`
  );
});

Then("I should be informed that this city is already tracked", function () {
  assertIsAnErrorWithMessage(this.lastError, `City is already tracked.`);
});

async function trackCity(
  watchListName: string,
  cityName: string,
  watchListsRepository: WatchListsRepository
) {
  const command: TrackCity = new TrackCity(watchListName, cityName);
  const handler: TrackCityHandler = new TrackCityHandler(watchListsRepository);
  await handler.handle(command);
}

async function displayWatchList(
  name: string,
  watchListProjections: WatchListProjector
): Promise<WatchListProjection> {
  const query: DisplayWatchList = new DisplayWatchList(name);
  const handler: DisplayWatchListHandler = new DisplayWatchListHandler(
    watchListProjections
  );
  const watchlist: WatchListProjection = await handler.handle(query);
  return watchlist;
}
