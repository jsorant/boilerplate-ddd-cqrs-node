import { ValueObject } from "../../DddModel/ValueObject";
import { UniqueIdentifierGenerator } from "../../SharedKernel/UniqueIdentifier";

export class WatchListId extends ValueObject {
  public readonly value: string;

  private constructor(value: string) {
    super();
    this.value = value;
    Object.freeze(this);
  }

  static createFrom(value: string) {
    return new WatchListId(value);
  }

  static createNew() {
    const value: string = UniqueIdentifierGenerator.generate();
    return new WatchListId(value);
  }
}
