const CONTEXT = Symbol.for(
  "__INTERNAL_CONTEXT_DO_NOT_USE_OR_YOU_WILL_GET_FIRED"
);

interface Store {
  get: <T>(context: Context<T>) => T;
  set: <T>(context: Context<T>, value: T) => void;
  has: (context: Context<unknown>) => boolean;
  remove: (context: Context<unknown>) => void;
}

interface Context<T> {
  [CONTEXT]: {
    defaultValue: T;
  };
}

export function createStore(): Store {
  const data = new Map<Context<unknown>, unknown>();
  return {
    get<T>(context: Context<T>): T {
      if (data.has(context)) {
        return data.get(context) as any;
      }
      return context[CONTEXT].defaultValue;
    },
    set<T>(context: Context<T>, value: T): void {
      data.set(context, value);
    },
    has(context: Context<unknown>): boolean {
      return data.has(context);
    },
    remove(context: Context<unknown>): void {
      data.delete(context);
    },
  };
}

export function createContext<T>(defaultValue: T): Context<T> {
  return {
    [CONTEXT]: {
      defaultValue,
    },
  };
}
