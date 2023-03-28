import { WatchListProjector } from "../../../App/Queries/Ports/WatchListProjector";
import {
  CityProjection,
  WatchListProjection,
} from "../../../App/Queries/Views/WatchListProjection";
import { Sqlite3Database } from "./Sqlite3Database";
import { WatchListCitiesTable } from "./Tables/WatchListCitiesTable";
import { WatchListTable } from "./Tables/WatchListTable";

export class Sqlite3WatchListProjector implements WatchListProjector {
  private database: Sqlite3Database;

  constructor(database: Sqlite3Database) {
    this.database = database;
  }

  async getWatchList(name: string): Promise<WatchListProjection> {
    const watchlist: any = await this.getWatchListOrThrow(name);

    const cityNames: Array<string> = await this.getCityNamesOfWatchlist(
      watchlist.id
    );

    return this.makeWatchListProjection(watchlist.name, cityNames);
  }

  async getWatchListOrThrow(name: string): Promise<any> {
    const watchlist: any = await this.selectWatchList(name);
    if (watchlist === undefined) {
      throw new Error(`Watchlist not found with name ${name}`);
    }
    return watchlist;
  }

  async selectWatchList(name: string): Promise<any | undefined> {
    return await this.database.getOne(
      `SELECT ${WatchListTable.COLUMN_ID}, ${WatchListTable.COLUMN_NAME} FROM ${WatchListTable.TABLE_NAME} WHERE ${WatchListTable.COLUMN_NAME}='${name}';`
    );
  }

  async getCityNamesOfWatchlist(id: string): Promise<Array<string>> {
    const res: any = await this.selectCityNamesOfWatchlist(id);
    return res.map((item: any) => item.city_name);
  }

  async selectCityNamesOfWatchlist(id: string): Promise<Array<any>> {
    return await this.database.getAll(
      `SELECT ${WatchListCitiesTable.COLUMN_CITY_NAME} FROM ${WatchListCitiesTable.TABLE_NAME} WHERE ${WatchListCitiesTable.COLUMN_WATCHLIST_ID}='${id}';`
    );
  }

  async makeWatchListProjection(
    name: string,
    cityNames: Array<string>
  ): Promise<WatchListProjection> {
    const cityProjections: Array<CityProjection> =
      await this.makeCityProjections(cityNames);

    return {
      name,
      cityProjections,
    };
  }

  async makeCityProjections(
    cityNames: Array<string>
  ): Promise<Array<CityProjection>> {
    const cityProjections: Array<CityProjection> = [];
    for (const cityName of cityNames) {
      cityProjections.push(await this.makeCityProjection(cityName));
    }
    return cityProjections;
  }

  async makeCityProjection(cityName: string): Promise<CityProjection> {
    return { name: cityName };
  }
}
