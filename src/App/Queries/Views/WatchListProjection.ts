export interface WatchListProjection {
  readonly name: string;
  readonly cityProjections: Array<CityProjection>;
}

export interface CityProjection {
  readonly name: string;
  // readonly weather: string;
  // readonly temperatureCelcius: string;
}
