interface BlackBox {
  with: <T>(ctx: BlackBoxContext<T>, value: T) => BlackBox;
  get: <T>(ctx: BlackBoxContext<T>) => T;
}

const INTERNAL = Symbol("BLACKBOX_INTERNAL");

interface BlackBoxContext<T> {
  [INTERNAL]: { defaultValue: T };
}

function createContext<T>(defaultValue: T): BlackBoxContext<T> {
  return {
    [INTERNAL]: { defaultValue },
  };
}

function createEmpty(): BlackBox {
  interface LinkedList {
    context: BlackBoxContext<any>;
    value: any;
    parent: LinkedList | null;
  }

  function createBlackbox(parent: LinkedList | null): BlackBox {
    function get<T>(ctx: BlackBoxContext<T>): T {
      let current = parent;
      while (current !== null && current.context !== ctx) {
        current = current.parent;
      }
      if (current === null) {
        return ctx[INTERNAL].defaultValue;
      }
      return current.value;
    }

    function withFn<T>(ctx: BlackBoxContext<T>, value: T): BlackBox {
      return createBlackbox({
        context: ctx,
        value,
        parent,
      });
    }

    return {
      get,
      with: withFn,
    };
  }

  return createBlackbox(null);
}

export const BlackBox = {
  createEmpty,
  createContext,
};
