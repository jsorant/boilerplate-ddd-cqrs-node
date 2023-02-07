import { Sqlite3Database } from "./Sqlite3Database";
import { WatchListsRepository } from "../../../App/Commands/Ports/WatchListsRepository";
import { WatchList } from "../../../Domain/WatchList/WatchList";
import { WatchListTable } from "./Tables/WatchListTable";
import { WatchListCitiesTable } from "./Tables/WatchListCitiesTable";
import { CityTable } from "./Tables/CityTable";

export class Sqlite3WatchListsRepository implements WatchListsRepository {
  private database: Sqlite3Database;

  constructor(database: Sqlite3Database) {
    this.database = database;
  }

  async getFromName(name: string): Promise<WatchList | undefined> {
    //TODO
    const watchList: any = await this.database.getOne(
      `SELECT ${WatchListTable.COLUMN_ID}, ${WatchListTable.COLUMN_NAME} FROM ${WatchListTable.TABLE_NAME} WHERE ${WatchListTable.COLUMN_NAME}='${name}';`
    );
    if (watchList === undefined) {
      return undefined;
    }

    const cities: any = await this.database.getAll(
      `SELECT ${WatchListCitiesTable.COLUMN_CITY_NAME} FROM ${WatchListCitiesTable.TABLE_NAME} WHERE ${WatchListCitiesTable.COLUMN_WATCHLIST_ID}='${watchList.id}';`
    );
    const cityNames: Array<string> = cities.map((item: any) => item.city_name);
    return WatchList.createFrom(watchList.id, watchList.name, cityNames);
  }

  async save(watchList: WatchList): Promise<void> {
    await this.saveWatchListAndItsCities(watchList);
  }

  async saveWatchListAndItsCities(watchList: WatchList): Promise<void> {
    await this.insertOrIgnoreWatchList(watchList);
    await this.saveCities(watchList);
  }

  private async insertOrIgnoreWatchList(watchList: WatchList): Promise<void> {
    await this.database.execute(
      `INSERT OR IGNORE INTO ${WatchListTable.TABLE_NAME} (${WatchListTable.COLUMN_ID}, ${WatchListTable.COLUMN_NAME}) VALUES ('${watchList.id.value}', '${watchList.name.value}')`
    );
  }

  private async saveCities(watchList: WatchList): Promise<void> {
    await this.deleteWatchListCityRelationships(watchList.id.value);
    for (const cityName of watchList.cities) {
      await this.saveCity(watchList.id.value, cityName.value);
    }
  }

  private async saveCity(watchListId: string, cityName: string): Promise<void> {
    await this.insertOrIgnoreCity(cityName);
    await this.insertWatchListCityRelationship(watchListId, cityName);
  }

  private async insertOrIgnoreCity(cityName: string): Promise<void> {
    await this.database.execute(
      `INSERT OR IGNORE INTO ${CityTable.TABLE_NAME} (${CityTable.COLUMN_NAME}) VALUES ('${cityName}')`
    );
  }

  private async deleteWatchListCityRelationships(
    watchListId: string
  ): Promise<void> {
    await this.database.execute(
      `DELETE FROM ${WatchListCitiesTable.TABLE_NAME} WHERE ${WatchListCitiesTable.COLUMN_WATCHLIST_ID}='${watchListId}'`
    );
  }

  private async insertWatchListCityRelationship(
    watchListId: string,
    cityName: string
  ): Promise<void> {
    await this.database.execute(
      `INSERT INTO ${WatchListCitiesTable.TABLE_NAME} (${WatchListCitiesTable.COLUMN_WATCHLIST_ID}, ${WatchListCitiesTable.COLUMN_CITY_NAME}) VALUES ('${watchListId}', '${cityName}')`
    );
  }
}
