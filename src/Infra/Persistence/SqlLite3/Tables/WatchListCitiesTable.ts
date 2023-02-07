import { Table } from "./Table";

export class WatchListCitiesTable implements Table {
  static TABLE_NAME: string = "watchlist_cities";
  static COLUMN_WATCHLIST_ID: string = "watchlist_id";
  static COLUMN_CITY_NAME: string = "city_name";

  getTableName(): string {
    return WatchListCitiesTable.TABLE_NAME;
  }

  getCreateTableScript(): string {
    return `CREATE TABLE ${WatchListCitiesTable.TABLE_NAME} (${WatchListCitiesTable.COLUMN_WATCHLIST_ID} TEXT NOT NULL, ${WatchListCitiesTable.COLUMN_CITY_NAME} TEXT NOT NULL)`;
  }
}
