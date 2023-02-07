import { Table } from "./Table";

export class WatchListTable implements Table {
  static TABLE_NAME: string = "watchlist";
  static COLUMN_ID: string = "id";
  static COLUMN_NAME: string = "name";

  getTableName(): string {
    return WatchListTable.TABLE_NAME;
  }

  getCreateTableScript(): string {
    return `CREATE TABLE ${WatchListTable.TABLE_NAME} (${WatchListTable.COLUMN_ID} TEXT NOT NULL PRIMARY KEY, ${WatchListTable.COLUMN_NAME} TEXT NOT NULL)`;
  }
}
