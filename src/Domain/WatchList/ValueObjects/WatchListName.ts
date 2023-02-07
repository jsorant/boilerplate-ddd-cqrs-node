import { ValueObject } from "../../DddModel/ValueObject";

export class WatchListName extends ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
    Object.freeze(this);
  }
}
