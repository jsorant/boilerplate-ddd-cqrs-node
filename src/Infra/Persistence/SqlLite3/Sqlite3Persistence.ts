import { WatchListsRepository } from "../../../App/Commands/Ports/WatchListsRepository";
import { WatchListProjector } from "../../../App/Queries/Ports/WatchListProjector";
import { Persistence } from "../Persistence";
import { Sqlite3Database } from "./Sqlite3Database";
import { Sqlite3WatchListProjector } from "./Sqlite3WatchListProjections";
import { Sqlite3WatchListsRepository } from "./Sqlite3WatchListsRepository";
import { CityTable } from "./Tables/CityTable";
import { Table } from "./Tables/Table";
import { WatchListCitiesTable } from "./Tables/WatchListCitiesTable";
import { WatchListTable } from "./Tables/WatchListTable";

export class Sqlite3Persistence implements Persistence {
  private database: Sqlite3Database;

  constructor(databaseFilePath: string) {
    const tables: Array<Table> = [
      new WatchListTable(),
      new CityTable(),
      new WatchListCitiesTable(),
    ];
    this.database = new Sqlite3Database(databaseFilePath, tables);
  }

  async reset(): Promise<void> {
    await this.database.reset();
  }

  getWatchListsRepository(): WatchListsRepository {
    return new Sqlite3WatchListsRepository(this.database);
  }

  getWatchListProjector(): WatchListProjector {
    return new Sqlite3WatchListProjector(this.database);
  }
}
