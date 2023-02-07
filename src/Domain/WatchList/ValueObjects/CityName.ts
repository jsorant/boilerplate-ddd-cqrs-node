import { ValueObject } from "../../DddModel/ValueObject";

export class CityName extends ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  static createFrom(value: string) {
    return new CityName(value);
  }
}
