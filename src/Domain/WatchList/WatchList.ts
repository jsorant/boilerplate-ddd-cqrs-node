import { RootAggregate } from "../DddModel/RootAggregate";
import { WatchListId } from "./ValueObjects/WatchListId";
import { WatchListName } from "./ValueObjects/WatchListName";
import { CityName } from "./ValueObjects/CityName";

export class WatchList extends RootAggregate<WatchListId> {
  public readonly name: WatchListName;
  public readonly cities: Array<CityName>;

  private constructor(
    id: WatchListId,
    name: WatchListName,
    cities: Array<CityName>
  ) {
    super(id);
    this.name = name;
    this.cities = cities;
  }

  static createNew(name: string): WatchList {
    return new WatchList(WatchListId.createNew(), new WatchListName(name), []);
  }

  static createFrom(
    id: string,
    name: string,
    cities: Array<string>
  ): WatchList {
    return new WatchList(
      WatchListId.createFrom(id),
      new WatchListName(name),
      cities.map(CityName.createFrom)
    );
  }

  track(cityName: string) {
    const city: CityName = new CityName(cityName);
    this.ensureCityIsNotAlreadyTracked(city);
    this.cities.push(city);
  }

  private ensureCityIsNotAlreadyTracked(city: CityName): void {
    if (this.hasCity(city)) {
      throw new Error(`City is already tracked.`);
    }
  }

  private hasCity(city: CityName) {
    return this.cities.find((element) => element.equals(city)) !== undefined;
  }
}
