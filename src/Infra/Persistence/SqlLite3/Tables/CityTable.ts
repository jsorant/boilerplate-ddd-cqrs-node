import { Table } from "./Table";

export class CityTable implements Table {
  static TABLE_NAME: string = "city";
  static COLUMN_NAME: string = "name";

  getTableName(): string {
    return CityTable.TABLE_NAME;
  }

  getCreateTableScript(): string {
    return `CREATE TABLE ${CityTable.TABLE_NAME} (${CityTable.COLUMN_NAME} TEXT NOT NULL PRIMARY KEY)`;
  }
}
