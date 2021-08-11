interface LinkedList {
  context: BlackBoxContext<any>;
  value: any;
  parent: LinkedList | null;
}

const INTERNAL = Symbol("BLACKBOX_INTERNAL");

interface BlackBoxContext<T> {
  [INTERNAL]: { defaultValue: T };
}

export class BlackBoxClass {
  static createContext<T>(defaultValue: T): BlackBoxContext<T> {
    return {
      [INTERNAL]: { defaultValue },
    };
  }

  static createEmpty(): BlackBoxClass {
    return new BlackBoxClass(null);
  }

  private constructor(private readonly parent: LinkedList | null) {}

  public get<T>(ctx: BlackBoxContext<T>): T {
    let current = this.parent;
    while (current !== null && current.context !== ctx) {
      current = current.parent;
    }
    if (current === null) {
      return ctx[INTERNAL].defaultValue;
    }
    return current.value;
  }

  public with<T>(ctx: BlackBoxContext<T>, value: T): BlackBoxClass {
    return new BlackBoxClass({
      context: ctx,
      value,
      parent: this.parent,
    });
  }
}
